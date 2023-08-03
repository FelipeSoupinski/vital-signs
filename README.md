# vital-signs

Open source project to analyze signs of software ecosystems' death.

## Require

- Postgres connection
- Redis server
- StackOverflow API credentials

## Redis

Require Redis connection
See more here https://developer.redis.com/howtos/quick-start
After installed run `redis-server` command

Overcommit config in WSL2 `sudo sysctl -w vm.overcommit_memory=1`

## .env config vars

SO_CLIENT_ID
SO_CLIENT_SECRET
SO_CLIENT_KEY
SO_SITE
SO_API_URL
DATABASE_URL
REDIS_HOST
REDIS_PORT
CONCURRENCY

## Prisma Config

> npm install
> npx prisma migrate dev
