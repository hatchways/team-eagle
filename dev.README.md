### API

#### Endpoints

User Routes

- `GET /users/current`
- `GET /users/active`
- `GET /users/disactive`
- `GET /users/changePic`

Auth Routes

- `POST /auth/register`
- `POST /auth/login`
- `DELETE /auth/logout`

Polls Routes

- `POST /polls`
- `PUT /polls/<pollId>`
- `DELETE /polls/<pollId>`
- `GET /polls`
- `GET /polls/votable`
- `GET /polls/friends`
- `GET /polls/:pollId`
- `POST /polls/:pollId/:imageIdx/vote`
- `DELETE /polls/:pollId/:imageIdx/vote`

Friends

- `GET /users/:userId/friends/followers`
- `GET /users/:userId/friends/followings`
- `GET /users/:userId/friends/suggestions?name=<query>`
- `POST /users/:userId/friends/:friendId/follow`
- `DELETE /users/:userId/friends/:friendId/follow`

FriendLists

- `GET /friendLists`
- `POST /friendLists`
- `DELETE friendLists/:listId`
- `PUT /friendLists`

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
