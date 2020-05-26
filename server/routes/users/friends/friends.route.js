const express = require('express');
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

module.exports = router;
