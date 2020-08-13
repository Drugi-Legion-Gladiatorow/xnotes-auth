# auth microservice for xnotes app

## how to

- clone this repo
- install all dependencies
  `npm install`
- run docker container

## env

### db.env

- MONGO_INITDB_DATABASE= db_name
- MONGO_INITDB_ROOT_USERNAME= db_username
- MONGO_INITDB_ROOT_PASSWORD= db_password

### auth.env

- MONGO_DB_HOST= db
- MONGO_DB_NAME= db_name
- MONGO_DB_USERNAME= db_username
- MONGO_DB_PASSWORD= db_password
- OAUTH_CLIENT_ID= your_oauth_client_id
- OAUTH_CLIENT_SECRET= your_oauth_client_secret
- OAUTH_CALLBACK_URL= successful_authentication_callback_url

## endpoints

GET `/` - show log in page

POST `/` - go to github authorization page

userdata is passed as a query string to `OAUTH_CALLBACK_URL` from env variables after logging in

failed login redirects back to `/`
