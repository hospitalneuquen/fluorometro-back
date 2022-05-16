## Fluorometro Backend

### First time


```bash
$ npm install
```

```bash
$ cp env.example .env 
# Edit .env file
```

### Everyday

Start mongo server using docker-compose. No disk persistence is used. 

```bash
$ docker-compose up
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
