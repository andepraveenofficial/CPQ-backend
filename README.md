# CPQ backend

### Installation
* `npm install`

### Start the Application
* `tsc -w`
* `npm run start:dev`

### for Knex 
* first create migrations
* `npm run build`
* `npm run build:knexfile` 

### migration creation
* `npx knex migrate:make create_users_table --knexfile src/knexfile.ts`

### Seed creation
* `npx knex seed:make initial_users --knexfile src/knexfile.ts`