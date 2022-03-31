FROM node:16

WORKDIR /srv/app

COPY package.json .
COPY yarn.lock .

RUN yarn 

COPY . .

RUN chmod +x /srv/app/entrypoint.sh
CMD ["/srv/app/entrypoint.sh"]