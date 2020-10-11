FROM node:10-alpine

ENV NODE_ENV=Devlopment
ENV MONGO_URL=mongodb+srv://admin:admin@rajecluster.o4zia.mongodb.net/EMP?retryWrites=true&w=majority
ENV PORT=8082

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8082

CMD [ "node", "server.js" ]
