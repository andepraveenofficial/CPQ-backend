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

### rollback the migration file

### Docker:
* Create Image: `docker build -t <image_name> .`
* Create and Run the Container: `docker run --name <container_name> -p <host_port>:<container_port> <image_name>`
  - `docker run --name cpq-backend -p 5000:5000 cpq-backend:0.0.2  `

* Run yml file for containers: `docker compose up -d`
