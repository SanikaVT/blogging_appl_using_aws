FROM node:13.12.0-alpine as dist

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./
RUN npm run build


FROM nginx:stable-alpine
COPY --from=dist /usr/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]