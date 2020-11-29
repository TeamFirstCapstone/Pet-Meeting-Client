FROM node:14-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install react-scripts@3.0.1 -g
RUN npm audit fix

ENV PATH /app/node_modules/.bin:$PATH   

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
