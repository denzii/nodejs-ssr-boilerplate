# nodejs-ssr-boilerplate (Work In Progress)

# Project Status
- [x] Render JSX at / 
- [x] Docker Image for server
- [x] Custom Server Logic
     - [x] Retry port on server startup
     - [x] Watch for sigint signals etc. to handle graceful shutdowns
     - [x] Inversion of control with TSyringe dependency injection
     - [x] ENV variables supplied through webpack
- [x] Hot Reload for Bundled CSS on the server
- [x] Docker Compose for local development with hot reload (With DB image & volume boilerplate commented out)
- [x] Docker Compose boilerplate for production (With DB image & volume boilerplate commented out)
- [x] Jest bootstrapped as a second webpack entrypoint 
- [x] Hydrate markup on the client
- [x] Sass
- [] React Router on the client
- [] Websockets for non / endpoints
- [] Graphql
- [] Prisma


# Running Locally

This project is a full-stack app and the express server on the backend requires client bundles to be generated ahead of time so they could be used as static assets. A bootstrap project is used to simplify usage!

`cd nodejs-ssr-boilerplate` (go to the root to use the bootstrap project)
`npm run install` (runs npm install concurrently across the frontend/backend projects and the isomorphic local library)
`npm start` (Transpile & Run the server through the browser-refresh library on the server, Transpile & watch the frontend code for changes )


# Running Through Containers

instructions for containerized runtime coming soon...
