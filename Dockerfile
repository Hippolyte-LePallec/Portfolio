# Étape de construction
FROM node:20-slim AS builder
WORKDIR /src
COPY . .
RUN npm install && npm run build

# Étape de production
FROM node:20-slim
WORKDIR /src
COPY --from=builder /src/.output ./.output
# Optionnel : copier le package.json si besoin de scripts
COPY --from=builder /src/package.json ./package.json

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
