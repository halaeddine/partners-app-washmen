FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY partners-app/ ./partners-app/
RUN cd partners-app && npm install @angular/cli && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/partners-app/dist ./partners-app/dist
COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3070

CMD ["node", "server.js"]