FROM node:23-alpine

WORKDIR /bookstore

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]



