# The Less project

## Dev environment

### Setup

1. Add `127.0.0.1 theless.dev` into the `/etc/hosts`;
2. Add local certificates in a browser.

### Start dev environment

1. Run `ENV=development docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`.

### Add local certificates (Google Chrome)

1. Open Chrome Settings -> Security -> Manage certificates
2. Drag and drop certificates (taken from /certs) there
3. Double click on each of them -> Trust -> "Always Trust"

### API service development

`cd api && go get ./...` - install deps.

### Rebuild docker images and start

1. Run `ENV=development docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`.

## Prod environment

### Deploy

1. `cd /usr/src/theless`;
2. `git pull`;
3. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`.

### Update LetsEncrypt certificates

1. Run
    ```
    sudo docker run -it --rm --name certbot \
                -v "/etc/letsencrypt:/etc/letsencrypt" \
                -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
                -p 80:80 -p 443:443
                certbot/certbot certonly
    ```
2. Update `theless.ru`, `www.theless.ru`, `the-less.ru` and `www.the-less.ru` certificates.

### Connect to the container

E.g. mongo container `docker-compose exec db mongo`