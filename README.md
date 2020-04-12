# The Less project

## Dev environment

### Setup

1. Add `127.0.0.0 theless.dev` into the `/etc/hosts`;
2. Add local certificates in browser.

### Start

1. Run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`.

## Prod environment

### Deploy

1. `cd /usr/src/theless`;
2. `git pull`;
3. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`.

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
