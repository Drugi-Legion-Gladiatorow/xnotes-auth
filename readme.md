# auth microservice for xnotes app

## how to

- clone this repo
- install all dependencies
  `npm install`
- run docker container

## endpoints

GET `/` - show log in page

POST `/` - go to github authorization page

userdata is passed as a query string to `/success` after logging in

failed login redirects back to `/`
