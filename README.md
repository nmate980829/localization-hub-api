# localization-hub-api
REST API for the localization hub project. The project intends to provide a way to synchronize localization files, and streamline translation processes.

## Description

This is project attempts to streamline communication between developers and translators in software projects. This is my university thesis project.

## Installation

```bash
$ npm install
$ yarn
```

## Running the app

```bash
# development
$ npm run start
$ yarn start

# watch mode
$ npm run start:dev
$ yarn start:dev

# production mode
$ npm run start:prod
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test
$ yarn test

# e2e tests
$ npm run test:e2e
$ yarn test:e2e

# test coverage
$ npm run test:cov
$ yarn test:cov
```

## Deploy server

You have to copy the compose file from the projects root directory and create a .env file next to it. You can start the server by running

```bash
docker-compose up
``` 

When you start the server the first time, the container will fail. You have to initialize the database by running these commands:

```bash
docker container run --network lohub-api_lohub -it --entrypoint /bin/sh nm0829/lohub-api
export DATABASE_URL=postgresql://lohub:lohub@postgres.db:5432/lohub
yarn migrate:deploy
yarn init:rights
```

## License

This project is [GNU General Public License v2.0](LICENSE).
