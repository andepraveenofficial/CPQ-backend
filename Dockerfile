FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source
RUN npm run migrate:rollback --steps=2
RUN npm run migrate
RUN npm run seed

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
