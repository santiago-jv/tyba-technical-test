FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./
RUN npm install --production

RUN apk add --no-cache openssl
RUN openssl genpkey -algorithm RSA -out private_key.pem
RUN openssl rsa -pubout -in private_key.pem -out public_key.pem

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
