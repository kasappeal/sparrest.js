# Sparrest.js

A [json-server](https://github.com/typicode/json-server) fork to enjoy developing frontend apps without a real backend, but with JWT auth.

## Setup

1. Create a `db.json` file with the entities of your DB
2. Run the server with `npm start` 
3. Register a user with `POST /auth/register { username: "luke", password: "skywalker" }`
4. Login to obtain your JWT token: `POST /auth/login { username: "luke", password: "skywalker" }`
5. Start using `json-server` routes in `/api/<json-server routes>`. You'll need to auth every request by adding an HTTP header: `Authorization: Bearer <JWT token>`

## Uploading files

You can upload files by making a multipart POST request with a file field (with file contents) to `/upload`.
