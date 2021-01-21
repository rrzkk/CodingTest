
FROM node:14.8.0-alpine AS build


RUN mkdir -p /codingtest/reactui
WORKDIR /codingtest/reactui

ENV PATH /codingtest/reactui/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

RUN npm run build
#CMD ["npm","run","expressstart"]
#CMD ["npm","run","start"]

FROM nginx:stable-alpine
COPY --from=build /codingtest/reactui/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
