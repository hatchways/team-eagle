# Poll App. Hatchways Project

## Server Setup
1. Run "yarn install" or "npm install" to install all node modules needed for the app to run
2. Make sure MongoDB is setup and running on your localhost on port 27017. The app will connect to "poll" database on your local mongo connection.
3. Run "yarn dev" or "npm run dev" to connect to server on "localhost:3001"

## How to load AWS Credentials for s3
For Mac/Linux:
1. Open/Nano/Vi ~/.zshrc or ~/.bashrc on your local computer
2. Enter the following commands:-
    - export AWS_ACCESS_KEY_ID="<insert key in quotes>"
    - export AWS_SECRET_ACCESS_KEY="<insert key in quotes>"
3. Run command: source ~/.zshrc or ~/.bashrc
For Windows:
1. Right click on My Computer and go to control panel
2. Search for environment variables (I do not where it is)
3. Add the above variables to the global system variables
4. Format your hard disk and install Linux (Recommended: Manjaro) or, if you have $$$$ , get a Mac.