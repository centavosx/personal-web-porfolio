# syntax=docker.io/docker/dockerfile:1

FROM node:26.13.0-alpine AS base

# Step 1. Build the app
FROM base AS builder
WORKDIR /app

# Node 26 images no longer include Corepack or Yarn, so this runs the Yarn
# release committed to the repo.
COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./
RUN node .yarn/releases/yarn-4.18.1.cjs install --immutable

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN node .yarn/releases/yarn-4.18.1.cjs build

# The build reads .env, and Next.js copies it into the standalone output. The
# container gets its values from env_file, so it stays out of the final image.
RUN rm -f .next/standalone/.env

# Step 2. Production image, with only what the standalone server needs
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
