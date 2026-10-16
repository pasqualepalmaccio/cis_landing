# Landing CIS: Next.js in modalità standalone, nessun segreto nell'immagine.
FROM node:22-alpine AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:22-alpine AS run
RUN addgroup -S web && adduser -S web -G web
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3050 HOSTNAME=::
COPY --from=build --chown=web:web /app/.next/standalone ./
COPY --from=build --chown=web:web /app/.next/static ./.next/static
COPY --from=build --chown=web:web /app/public ./public
USER web
EXPOSE 3050
# HOSTNAME=:: ascolta su IPv4 e IPv6: nel container «localhost» risolve
# prima su ::1, ed è lì che la sonda di Coolify (/api/health) bussa.
CMD ["node", "server.js"]
