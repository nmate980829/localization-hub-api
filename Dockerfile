FROM node:alpine AS builder
LABEL stage=builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn prisma:generate && yarn build
RUN npm prune --production

FROM node:alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "start:docker"]