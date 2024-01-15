FROM node:21-alpine as prod-deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:21-alpine as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]


