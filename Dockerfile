FROM node:14

WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1

# apt-get and system utilities
RUN apt-get update && apt-get install -y curl apt-utils apt-transport-https debconf-utils gcc build-essential g++ && rm -rf /var/lib/apt/lists/*


WORKDIR /app
ADD ./src/package.json /app/
RUN npm install

COPY ./src .

EXPOSE 8088

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]
