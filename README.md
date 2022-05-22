# nodejs-ssr-boilerplate (Work In Progress)


# Project Status
- [x] Render JSX at / 
- [x] Docker Image for server
- [x] Custom Server Logic
     - [x] Retry port on server startup
     - [x] Watch for sigint signals etc. to handle graceful shutdowns & startups as well as a custom delayed Nodemon setup
     - [x] Inversion of control with TSyringe dependency injection
     - [x] ENV variables supplied through webpack
- [x] Docker Compose for local development with hot reload (With DB image & volume boilerplate commented out)
- [x] Docker Compose boilerplate for production (With DB image & volume boilerplate commented out)
- [x] Jest bootstrapped as a second webpack entrypoint 
- [] Hydrate markup on the client
- [] React Router on the client
- [] Websockets for non / endpoints
- [] Graphql
- [] Prisma


# Running Locally

`cd server && npm i && npm run build:dev`

instructions for containerized runtime coming soon...
