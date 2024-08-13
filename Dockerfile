ARG DEB_VERSION=mainline-bookworm
FROM nginx:${DEB_VERSION} as build

RUN apt update && apt upgrade -y && \
    apt install -y nodejs npm

COPY src            /var/lib/build-coresmokedb-web/src/
COPY public         /var/lib/build-coresmokedb-web/public/
COPY .env.*         /var/lib/build-coresmokedb-web/
COPY package*       /var/lib/build-coresmokedb-web/
COPY index.html     /var/lib/build-coresmokedb-web/
COPY vite.config.js /var/lib/build-coresmokedb-web/

# Set up nginx config
ADD private-config/docker-nginx.conf /etc/nginx/conf.d/perl5-coresmokedb-web.conf

# Install dependencies
WORKDIR /var/lib/build-coresmokedb-web/
RUN npm install && npm audit fix --force || true

# Build the thing and deploy
RUN npm run build:main
RUN cp -a dist/ /var/lib/perl5-coresmokedb-web/
WORKDIR /var/lib/perl5-coresmokedb-web/
