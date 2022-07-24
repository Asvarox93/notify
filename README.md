# Notify
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/Asvarox93/notify/branch/main/graph/badge.svg?token=MTZ0Z3MB2T)](https://codecov.io/gh/Asvarox93/notify)

That's my first chat project that covers both backend and frontend servers.
I was very excited that i have an opportunity and motivation to build that app.

***

## Notify Server

Backend server was written in node.js using typescript. API was served by Express server and real time communication was available by Socket.io. Most endpoint was securted by JWT. Testing was provided by Jest.

## Technologies used in backend

- Node.js
- Express
- Socket.io
- Jest
- JWT
- Typescript

## Environments used

```dosini
# .env.example, committed to repo
PORT=8000
dbUser=postgres
dbHost=localhost
dbDatabase=Notify
dbPassword=Qwerty@123
dbPort=5432
dbDialect=postgres
TOKEN_SECRET=4cafa62edf3e11c8fb1c2643ec1285da0df7bc7d593be23f6e8f0022b692bde1231
REFRESH_TOKEN_SECRET=7ebc8b13fec90bdc22322945198e5b45abda41fa62d38247f8f0fce866
```

To generate `TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` use in node cli:

```node
require('crypto').randomBytes(256).toString('base64')
```

## Run backend server

```bash
npm install
npm run dev
```

## Test backend server

```bash
npm test
```
