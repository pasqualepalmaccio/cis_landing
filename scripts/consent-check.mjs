// Verifica del consenso (record docs/decisioni/2026-10-17-consenso-cookie-e-campagne.md).
// Uso: node scripts/consent-check.mjs <url-base> [porta-devtools]
// Serve un browser headless con il protocollo DevTools aperto (--remote-debugging-port, default 9333).
// Le richieste verso Google e Meta vengono bloccate in uscita ma registrate:
// si controlla che il browser NON le tenti prima del consenso e le tenti dopo.
// Esce con codice 1 al primo controllo fallito.

const [, , base, port = "9333"] = process.argv;
if (!base) {
  console.error("uso: node scripts/consent-check.mjs <url-base> [porta-devtools]");
  process.exit(2);
}

const THIRD = /googletagmanager|google-analytics|analytics\.google|doubleclick|googleadservices|facebook\.(com|net)/;

const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = new Map();
const thirdParty = [];
const consentPosts = [];
const consentStatuses = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) {
    pending.get(d.id)(d.result ?? d.error);
    pending.delete(d.id);
  }
  if (d.method === "Network.requestWillBeSent") {
    const url = d.params.request.url;
    if (THIRD.test(url)) thirdParty.push(url);
    if (url.endsWith("/api/consent")) consentPosts.push(d.params.requestId);
  }
  if (d.method === "Network.responseReceived" && consentPosts.includes(d.params.requestId)) {
    consentStatuses.push(d.params.response.status);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++seq;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;
const click = (text) =>
  evaluate(`(() => { const b = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === ${JSON.stringify(text)}); if (!b) return false; b.click(); return true; })()`);
const bannerVisible = () => evaluate(`!!document.querySelector('[aria-label="Consenso ai cookie"]')`);

let failed = 0;
const check = (ok, label) => {
  console.log(`${ok ? "OK  " : "FAIL"} ${label}`);
  if (!ok) failed++;
};

await send("Network.enable");
await send("Network.setBlockedURLs", { urls: ["*googletagmanager*", "*google-analytics*", "*doubleclick*", "*googleadservices*", "*facebook.net*", "*facebook.com*"] });
await send("Network.clearBrowserCookies");
await send("Page.enable");

// 1. Prima visita: banner presente, nessuna terza parte.
await send("Page.navigate", { url: `${base}/it` });
await sleep(3500);
check(await bannerVisible(), "il banner compare alla prima visita");
check(thirdParty.length === 0, `nessuna richiesta a terze parti prima della scelta (${thirdParty.length})`);

// 2. Rifiuta: registro 201, ancora nessuna terza parte, il banner non torna.
check(await click("Rifiuta"), "pulsante «Rifiuta» trovato");
await sleep(1500);
check(consentStatuses.includes(201), `il registro risponde 201 al rifiuto (${consentStatuses.join(",")})`);
check(thirdParty.length === 0, "nessuna terza parte dopo il rifiuto");
await send("Page.reload");
await sleep(3000);
check(!(await bannerVisible()), "il banner non torna dopo il rifiuto");
check(thirdParty.length === 0, "nessuna terza parte al caricamento successivo");

// 3. Preferenze dal footer, accetta tutto: ora i tag partono.
check(await click("Preferenze cookie"), "link «Preferenze cookie» nel footer");
await sleep(800);
check(await click("Accetta tutti"), "pulsante «Accetta tutti» nelle preferenze");
await sleep(2500);
check(thirdParty.some((u) => u.includes("googletagmanager")), "gtag.js richiesto dopo il consenso");
check(thirdParty.some((u) => u.includes("connect.facebook.net")), "fbevents.js richiesto dopo il consenso");
const queued = () => evaluate(`(window.fbq?.queue ?? []).filter(a => a[0] === 'track' && a[1] === 'PageView').length`);
const before = await queued();
check(before >= 1, `PageView del Pixel in coda sulla home (${before})`);
check(await evaluate(`(window.fbq?.queue ?? []).some(a => a[0] === 'set' && a[1] === 'autoConfig' && a[2] === false)`), "advanced matching automatico del Pixel spento");

// 4. Pagina di pre-registrazione: nessun evento Pixel.
await evaluate(`(() => { const a = document.querySelector('a[href="/it/registrazione"]'); a?.click(); return !!a; })()`);
await sleep(2500);
check((await evaluate("location.pathname")) === "/it/registrazione", "navigazione interna a /it/registrazione");
check((await queued()) === before, "nessun PageView del Pixel su /registrazione");

console.log(`\nterze parti tentate: ${thirdParty.length}; risposte del registro: ${consentStatuses.join(",")}`);
ws.close();
process.exit(failed ? 1 : 0);
