FROM node:carbon
WORKDIR /fuckapp
COPY package.json /fuckapp
RUN npm install
COPY . /fuckapp
CMD node /fuckapp/app.js
EXPOSE 8080
