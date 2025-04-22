FROM node:18-alpine as build
WORKDIR /app
COPY ../frontend/package.json ../frontend/babel.config.js ./
RUN npm install
COPY ../frontend ./
RUN npm run build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
