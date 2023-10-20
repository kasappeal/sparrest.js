# Sparrest.js 2.0

A [json-server](https://github.com/typicode/json-server) fork to enjoy developing frontend apps without a real backend, but with JWT auth.

## Setup

1. Create a `/database/db.json` file with the entities of your DB, you can create as many entities as you want
  - Example with Tweets:
   ```js
  {
    "users": [],
    "tweets": []
  }

  ```
2. Create a .env file or edit the .env.example file provided to configure environment variables, if not set all variables will be created with default values as seen in `/config/index.js`file
  - Example .env file:
   ```text
    UPLOAD_FOLDER=../public/uploads
    DB_FILE=../database/db.json
    AUTH_READ=yes
    AUTH_WRITE=no
    SECRET_KEY=Annie is Vader
    JWT_EXPIRATION=24h
    PORT=8000
    SALT=10
   ```
4. Run the server with `npm start` 
5. Register a user with `POST /auth/register { username: "luke", password: "skywalker" }`
6. Login to obtain your JWT token: `POST /auth/login { username: "luke", password: "skywalker" }`
7. Start using `json-server` routes in `/api/<resource-name>`. You'll need to auth every request by adding an HTTP header: `Authorization: Bearer <JWT token>`

## Uploading files

You can upload files by making a multipart POST request with a file field (with file contents) to `/api/upload`.

## Documentation

- You can checout the API Documentation in `http://localhost:8000` and following the link provided or directly in `http://localhost:8000/api/docs`. Note that if you set a different port in .env or config files you will need to change the port accordingly.
- In order to unlock protected routes (shown with a open padlock) you must login, copy accessToken value, click in `Authorize` button and paste it.
- Documentation examples are done with a sample tweet Schema.

## Postman

- In the repo there is a file called `Sparrest.postman_collection.json` with a sample collenction wich you can directly import in Postmand and start using it right away.
- To import the collection follow the next steps:
1. Click in the top left Import button next to your workspace name:
   
    ![import](https://github.com/JoseAlbDR/sparrest.js/assets/128265706/72eea39e-7b2b-49b2-9edd-1e55daad498c)

3. Drop or select `Sparrest.postman_collection.json` and import it

- Note that the collection is made with a resourche called `tweets` you can change the resource name at any time to suit your needs.
  
## How to Use Postman Collection

1. Create a user:
  - POST /auth/register
  ![register](https://github.com/JoseAlbDR/sparrest.js/assets/128265706/e70a6074-7da6-45b2-821e-7ab42f4e5981)

2. Login with same credentials:
  - POST /auth/login
  ![login](https://github.com/JoseAlbDR/sparrest.js/assets/128265706/02c13071-b2ae-480f-8f96-3982cc797c07)

3. Copy given accessToken and set and Authorization => Type: Bearer Token in protected routes:
  - POST /api/{resource}
  - PATCH /api/{resource}
  - DELETE /api/{resource}
  - POST /api/upload
  - GET /users/me
  ![auth](https://github.com/JoseAlbDR/sparrest.js/assets/128265706/f376f2c5-a22f-4931-ace4-358698fe8626)

  - Optionally you can create a new Global/Environment variable, paste the token value inside and set it in all protected endpoints: Authorization => type: Bearer Token {{variableName}}
    
Change {resource} for your resource name, per example tweets or products and freely test the API with Postman.
  
