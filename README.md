## Introduction

This is the backend of MyPlant App:

- https://myplant-app.herokuapp.com

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Environment Variables

If you look at src/startup/config.ts, you'll see JWT_KEY and MONGODB_URL. For security reasons, you should store the token key and DB connection string as an environment variable.

On Linux:

    export JWT_KEY=yourSecureKey
    export MONGODB_URL=yourMongoDBConnection

On Windows:

    set JWT_KEY=yourSecureKey
    set MONGODB_URL=yourMongoDBConnection

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Start the Server

    npm run dev

This will launch the Node server on port 8000. If that port is busy, you can set a different point in .env file at the root folder.

Open up your browser and head over to:

http://localhost:8000/

You should see the Hello World message. That confirms that you have set up everything successfully.
