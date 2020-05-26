const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const User = require('../../../models/user');

// @route:  GET /users/:userId/friends
// @desc:   Find and return array of friends of specified userId
// @access: Public
router.get('/', async (req, res) => {
  if (!req.params.userId)
    throw 'please make sure to include userId param in the API URL';

  const user = await User.findById(req.params.userId);
  const friends = [];

  for (const friendId of user.friendIds) {
    friends.push(await User.findById(friendId));
  }

  res.json({ friends });
});

// @route:  GET /users/:userId/friends/suggestions?name=<query>
// @desc:   Gets a list of suggested friends (random). Can take a name query parameter
// @access: Private
router.get(
  '/suggestions',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const nameQuery = req.query.name;
    let suggestions;

    if (nameQuery) {
      suggestions = await User.find({
        name: new RegExp(nameQuery, 'i'),
      });
    } else {
      suggestions = await User.find({});
    }

    return res.status(200).json({ suggestions });
  }
);

module.exports = router;
