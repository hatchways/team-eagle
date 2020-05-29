const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router({ mergeParams: true });
const User = require('../../../models/user');
const routeUtil = require('../../util');

// @route:  GET /users/:userId/friends/followers
// @desc:   Find and return array of followers of userId
// @access: Public
router.get('/followers', async (req, res) => {
  let result = await User.findById(req.params.userId)
    .populate('friendIds')
    .exec();
  let followers = result.friendIds;

  // filter out only wanted fields
  followers = routeUtil.parseArrOfUserObjs(followers);

  res.json(followers);
});

// @route:  GET /users/:userId/friends/followings
// @desc:   Find and return array of followings of userId
// @access: Public
router.get('/followings', async (req, res) => {
  let followings = await User.find({ friendIds: req.params.userId });

  // filter out only wanted fields
  followings = routeUtil.parseArrOfUserObjs(followings);

  res.json(followings);
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
        $and: [
          { name: new RegExp(nameQuery, 'i') },
          { friendIds: { $nin: [req.params.userId] } },
        ],
      });
    } else {
      suggestions = await User.find({
        friendIds: { $nin: [req.params.userId] },
      });
    }

    // filter out only wanted fields
    suggestions = routeUtil.parseArrOfUserObjs(suggestions);

    return res.status(200).json(suggestions);
  }
);

// @route:  POST /users/:userId/friends/:friendId/follow
// @desc:   Make current user follow user at friendId
// @access: Private
router.post(
  '/:friendId/follow',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const currUser = req.user;
    const followeeId = req.params.friendId;
    const followeeIdIsValid = await mongoose.isValidObjectId(followeeId);

    if (!followeeIdIsValid) {
      return res
        .status(404)
        .json({ message: 'Invalid provided friendId param' });
    }

    const requestedUser = await User.findOne({ _id: followeeId });

    if (!requestedUser) {
      return res
        .status(404)
        .json({ message: 'No user at provided friendId param' });
    } else if (requestedUser.friendIds.includes(currUser._id)) {
      return res.status(401).json({ message: 'User already followed' });
    }

    requestedUser.friendIds.push(currUser._id);
    await requestedUser.save();

    requestedUser.password = null;

    res.json({
      message: 'Success! User followed',
      requestedUser: requestedUser,
    });
  }
);

// @route:  DELETE /users/:userId/friends/:friendId/follow
// @desc:   Make current user unfollow user at friendId
// @access: Private
router.delete(
  '/:friendId/follow',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const currUser = req.user;
    const unfolloweeId = req.params.friendId;
    const unfolloweeIdIsValid = await mongoose.isValidObjectId(unfolloweeId);

    if (!unfolloweeIdIsValid) {
      return res
        .status(404)
        .json({ message: 'Invalid provided friendId param' });
    }

    const requestedUser = await User.findOne({ _id: unfolloweeId });

    if (!requestedUser) {
      return res
        .status(404)
        .json({ message: 'No user at provided friendId param' });
    } else if (!requestedUser.friendIds.includes(currUser._id)) {
      return res.status(401).json({ message: 'User already unfollowed' });
    }

    requestedUser.friendIds = requestedUser.friendIds.filter(
      (el) => el._id.toString() !== currUser._id.toString()
    );
    await requestedUser.save();

    res.json({
      message: 'Success! User unfollowed',
      requestedUser: requestedUser,
    });
  }
);

module.exports = router;
