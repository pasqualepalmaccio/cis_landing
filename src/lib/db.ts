import postgres from "postgres";

/* Postgres dedicato alla landing (Coolify, progetto «CIS Landing», backup
   orario su S3). Ci vivono il registro dei consensi e le violazioni CSP: il
   filesystem del container sparisce a ogni rilascio. */

type Sql = ReturnType<typeof postgres>;

let client: Sql | null = null;
let migrated: Promise<void> | null = null;

export class DatabaseUnavailable extends Error {}

export async function db(): Promise<Sql> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new DatabaseUnavailable("DATABASE_URL non impostata");
  client ??= postgres(url, { max: 5, idle_timeout: 30, connect_timeout: 5, onnotice: () => {} });
  migrated ??= migrate(client).catch((error: unknown) => {
    migrated = null;
    throw error;
  });
  await migrated;
  return client;
}

/** Da chiamare dopo un errore: la richiesta successiva riapplica lo schema.
 *  Copre il database ricreato o ripristinato vuoto mentre il processo è vivo. */
export function recheckSchema() {
  migrated = null;
}

/* Schema idempotente, applicato al primo uso. Il registro dei consensi è in
   sola aggiunta: un trigger rifiuta UPDATE e DELETE, così una riga scritta è
   una prova che il codice non può alterare. */
async function migrate(sql: Sql) {
  await sql.unsafe(`
    create table if not exists consent_records (
      id           bigserial primary key,
      consent_id   uuid not null,
      recorded_at  timestamptz not null default now(),
      client_at    timestamptz,
      version      text not null,
      statistics   boolean not null,
      marketing    boolean not null,
      action       text not null,
      lang         text,
      path         text,
      ip_hash      text,
      user_agent   text,
      policy_hash  text not null
    );
    create index if not exists consent_records_consent_id on consent_records (consent_id);
    create index if not exists consent_records_recorded_at on consent_records (recorded_at);

    create or replace function consent_records_append_only() returns trigger language plpgsql as $$
    begin
      raise exception 'consent_records è in sola aggiunta';
    end $$;
    drop trigger if exists consent_records_no_change on consent_records;
    create trigger consent_records_no_change before update or delete on consent_records
      for each row execute function consent_records_append_only();

    create table if not exists policy_versions (
      hash         text primary key,
      version      text not null,
      recorded_at  timestamptz not null default now(),
      content      jsonb not null
    );

    create table if not exists csp_reports (
      id            bigserial primary key,
      recorded_at   timestamptz not null default now(),
      document_uri  text,
      blocked_uri   text,
      directive     text,
      raw           jsonb not null
    );
    create index if not exists csp_reports_recorded_at on csp_reports (recorded_at);

    -- Registro dei tentativi di pre-registrazione: si scrive PRIMA di chiamare
    -- il CRM. id = chiave di idempotenza verso il CRM (UUID casuale, mai una
    -- sequenza: un database ripristinato non deve riusare chiavi già spese).
    -- Il payload si cancella solo dopo che il CRM ha confermato di avere il
    -- record (verified_at), mai sulla sola risposta 201.
    create table if not exists preregistration_attempts (
      id               uuid primary key,
      received_at      timestamptz not null default now(),
      status           text not null check (status in ('received', 'delivered', 'failed', 'rejected')),
      attempts         integer not null default 0,
      next_attempt_at  timestamptz not null default now(),
      last_attempt_at  timestamptz,
      last_error       text,
      delivered_at     timestamptz,
      verified_at      timestamptz,
      crm_contact_id   uuid,
      crm_prereg_id    uuid,
      suspicious       boolean not null default false,
      suspicious_reason text,
      ip_hash          text,
      payload          jsonb,
      payload_purged_at timestamptz
    );
    create index if not exists preregistration_attempts_status on preregistration_attempts (status, next_attempt_at);
    create index if not exists preregistration_attempts_ip on preregistration_attempts (ip_hash, received_at);
  `);
}
