FROM node:22-alpine AS build

WORKDIR  /app

COPY package*.json ./


RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist/angular-assessment/browser /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
