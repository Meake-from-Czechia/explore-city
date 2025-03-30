# Explore city

---------
## Prerequisites
- SQL server instance running
- .env file in root directory with configuration:
- SSL certificates in certs/
  - server.crt - pem-encoded public certificate
  - server.key - pem-encoded private key
```dotenv
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

## Usage
- Clone repo
- Set env file to link to valid sql server instance
- ``
$ sudo docker-compose up --build [-d]
  ``
- ???
- Profit
- Swagger running at `hostname:3433/api`
- Api running at `hostname:3433/`

## Live
- Currently live at https://meake.cz:3433/api
