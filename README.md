# CPQ backend

### Installation
* `npm install`

### Start the Application
* `npm run build`
* `npm run migrate`
* `npm run seed`
* `npm run start:dev`

### Migration creation:
`npx knex migrate:make create_users_tabel --knexfile src/knexfile.ts`

### Seed Creation: 
`npx knex seed:make initial_users --knexfile src/knexfile.ts`

### Docker:
* Create Image: `docker build -t <image_name> .`
* Run yml file for containers: `docker compose up -d`
