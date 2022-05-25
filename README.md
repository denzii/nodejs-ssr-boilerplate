# nodejs-ssr-boilerplate (Work In Progress)

# Project Status
- [x] Sends JSX as string on the / route on the server the page is requested in the browser and hydrates that markup on the client.
- [x] Hot Reload for Bundled CSS on the server
- [x] Sass
- [x] Jest (bootstrapped as a second webpack entrypoint on the server) 
- [x] Docker Image for server
- [x] Custom Server Logic
     - [x] Retry port on server startup
     - [x] Watch for sigint signals etc. to handle graceful shutdowns
     - [x] Inversion of control with TSyringe dependency injection
     - [x] ENV variables supplied through webpack
- [x] Docker Compose for local development with hot reload (With DB image & volume boilerplate commented out)
- [x] Docker Compose boilerplate for production (With DB image & volume boilerplate commented out)
- [] React Router on the client
- [] Graphql over Web sockets for async requests to the server
- [] Prisma ORM
- [] Code generation for graphql from a prisma schema to avoid writing boilerplate


# Running Locally

This project is a full-stack app and the express server on the backend requires client bundles to be generated ahead of time so they could be used as static assets. A bootstrap project is used to simplify usage!

`cd nodejs-ssr-boilerplate` (go to the root to use the bootstrap project)


`npm i && npm run install` (installs the concurrently library to run npm install concurrently across the frontend/backend projects and the isomorphic local library)


`npm start` (Transpile & Run the server through the browser-refresh library on the server, Transpile & watch the frontend code for changes )


# Running Through Containers

instructions for containerized runtime coming soon...
