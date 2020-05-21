# Poll App. Hatchways Project

## Server Setup
1. Run "yarn install" or "npm install" to install all node modules needed for the app to run
2. Make sure MongoDB is setup and running on your localhost on port 27017. The app will connect to "poll" database on your local mongo connection.
3. Run "yarn dev" or "npm run dev" to connect to server on "localhost:3001"

## How to load AWS Credentials for s3
Go to .env file and enter the following credentials:

AWS_SECRET_ACCESS_KEY = ""
AWS_ACCESS_KEY_ID = ""

The upload functions will take the credentials from your local .env file. Please ask for credentials.