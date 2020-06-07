const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const FriendList = require('../../models/friendList');
const getUserLists = require('./utils');

// @route:  GET /friendLists
// @desc:   Get all user's friends lists
// @access: Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    getUserLists(req.user._id)
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }
);

// @route:  POST /friendLists
// @desc:   Create new friend list
// @access: Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const list = new FriendList({
      title: req.body.title,
      userId: mongoose.Types.ObjectId(req.user._id),
      friendIds: req.body.friendIds.map((id) => mongoose.Types.ObjectId(id)),
    });
    list
      .save()
      .then(() => getUserLists(req.user._id))
      .then((result) => res.json(result))
      .catch(next);
  }
);

// @route:  DELETE friendLists/:listId
// @desc:   Delete friend list
// @access: Private
router.delete(
  '/:listId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const listId = req.params.listId;
    const list = await FriendList.findById(listId);
    list
      .remove()
      .then(() => getUserLists(req.user._id))
      .then((result) => res.json(result))
      .catch(next);
  }
);

// @route:  PUT /friendLists/:listId
// @desc:   Update friend list
// @access: Private
router.put(
  '/:listId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const listId = req.params.listId;
    let list = await FriendList.findById(listId);
    if (!list) {
      res.status(404).send('List not found');
      return;
    }

    list.title = req.body.title;
    list.friendIds = req.body.friendIds.map((id) =>
      mongoose.Types.ObjectId(id)
    );

    list
      .save()
      .then(() => getUserLists(req.user._id))
      .then((result) => res.json(result))
      .catch(next);
  }
);

module.exports = router;
