# Poll App. Hatchways Project

## Frontend

___

## Backend
### Server
#### Setup
1. Run `yarn install` to install all node modules needed for the app to run
2. Make sure MongoDB is setup and running on your localhost on port 27017. The app will connect to "poll" database on your local mongo connection.
3. Run `yarn dev` to connect to server on `localhost:3001`

### API
#### Endpoints
- `/auth/register`
 - Parameters: _name, email, password_
- `/auth/login`
 - Parameters: _email, password_

#### Protecting Endpoints
To make a certain API endpint only accessible by logged-in users, do the following:
1. Navigate to route file
2. Import `passport` package
3. Add `passport.authenticate('jwt', { session: false })` as the second parameter in `router` function. For example:
```JavaScript
router.get("/welcome",
  passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    ...
  }
);
```