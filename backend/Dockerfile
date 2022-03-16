FROM node:16.14.0
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
CMD npm start
