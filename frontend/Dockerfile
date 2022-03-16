FROM node:16.14.0
WORKDIR /frontend
COPY package.json .
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .
CMD npm start
