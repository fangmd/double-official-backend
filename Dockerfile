FROM node:latest
EXPOSE 3021
EXPOSE 3306

# create app directory
WORKDIR /app

# Copy files to image
COPY ["./package.json", "./package-lock.json", "tsconfig.json", "./.env", "./.env.production", "/app/"]

# run npm install before copy ./src can help you cache images
RUN npm install

# Copy files to image
COPY ["./.env", "./.env.production", "/app/"]

COPY ["./src", "/app/src"]

CMD ["npm", "start"]