# # Step 1
# FROM node:10-alpine as build-step
# RUN mkdir /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install

# COPY . /app
# RUN npm run build

# # Stage 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# build environment
# pull the base image
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]