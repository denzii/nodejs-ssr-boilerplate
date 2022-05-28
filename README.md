# nodejs-ssr-boilerplate (Work In Progress)

# Project Status
- [x] Sends JSX as string from the server on the root route when the page is requested by the browser... Hydrates that markup on the client after fetching the resulting HTML.
- [x] Hot Reload for Bundled CSS on the server
- [x] Sass
- [x] Jest (bootstrapped as a second webpack entrypoint on the server) 
- [x] Docker Image for server
- [x] Custom Server Logic
     - [ ] Retry port on server startup
     - [ ] Pick new port if retries fail a set amount of time
     - [x] Watch for sigint signals etc. to handle graceful shutdowns
     - [x] Inversion of control with TSyringe dependency injection
     - [x] ENV variables supplied through webpack
- [x] Docker Compose for local development with hot reload (With DB image & volume boilerplate commented out)
- [x] Docker Compose boilerplate for production (With DB image & volume boilerplate commented out)
- [ ] Universal State Management
- [ ] React Router on the client
- [ ] Graphql over Web sockets for async requests to the server
- [ ] Prisma ORM
- [ ] Code generation for graphql from a prisma schema to avoid writing boilerplate


# Running Locally
`npm i` (installs the concurrently library to run npm install concurrently across the frontend/backend projects and the isomorphic local library)

* Preferred way of running things is using containers, however if for any reason you need to run this locally, please install postgres on your linux first using the bash script below.
* Please do not forget to update the prisma/.env file connection string to reflect on the fact that we are connecting to postgres locally by changing 
`@postgresql:5432` To `@localhost:5434` (Note the difference in the port)


`cd nodejs-ssr-boilerplate/src/script` (go to the root to use the bootstrap project)


`. ./.setupPostgres.sh` (Ensures postgres is installed, sets up a role and db so the psql command will work without problems on the linux user)


`npx prisma migrate dev --name init` (the schema exist with boilerplate relations so just apply a migration to create the tables)


`npx prisma db seed` ( seed the created tables with the data inside the prisma/seed.js file)

`npx prisma generate` ( generate the code & types for our schema )


This project is a full-stack app and the express server on the backend requires client bundles to be generated ahead of time so they could be used as static assets. A bootstrap project is used to simplify usage!

`cd nodejs-ssr-boilerplate` (go to the root to use the bootstrap project)




`npm run start:local` (Transpile & Run the server through the browser-refresh library on the server, Transpile & watch the frontend code for changes )


# Running Through Containers

* Please do not forget to update the prisma/.env file connection string to reflect on the fact that we are connecting to postgres on a container by changing 
 `@localhost:5434`  To `@postgresql:5432` (Note the difference in the port

`cd nodejs-ssr-boilerplate` (Go into the bootstrap project)
`npm start` (Run docker-compose up -f docker-compose.dev.yaml) 
