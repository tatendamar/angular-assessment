FROM node:22-alpine AS build

WORKDIR  /app

COPY package*.json ./


RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist/angular-assessment /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "deamon off;"]
