FROM node:16.3.0-alpine as build

RUN  mkdir -p /home/app
COPY ./ ./home/app

WORKDIR /home/app
RUN npm i && npm run build

######################################

# for production where we dont need to restart the server, we can use the multistage prod steps
FROM node:16.3.0-alpine as prod

COPY --from=build ./home/app/dist ./home/app

# node modules kept out of bundle via node extarnals but needed as well as the bundle for "reflect-metadata"
# multi stage build used to reduce the image size so its like node modules isnt even there.
COPY --from=build ./home/app/node_modules ./home/app/node_modules 

RUN export NODE_ENV=production

CMD ["node", "./home/app/main.js"]