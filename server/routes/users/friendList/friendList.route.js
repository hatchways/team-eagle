const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router({ mergeParams: true });
const User = require('../../../models/user');
const FriendList = require('../../../models/friendList');
const routeUtil = require('../../util');

function getUserLists(userId) {
  return new Promise((resolve, reject) => {
    FriendList.find({ userId }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
      // If we need to populate:
      // FriendList.populate(docs, 'friendIds')
      //   .then((result) => {
      //     resolve(result.map((friend) => ({
      //       _id: friend._id,
      //       name: friend.name,
      //       active: friend.active,
      //     })));
      //   })
      //   .catch((err) => reject(err));
    });
  });
}

// @route:  GET /users/:userId/friendList
// @desc:   Get all user's friends lists
// @access: Public
router.get('/', async (req, res) => {
  getUserLists(req.params.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      throw err;
    });
});

// @route:  POST /users/:userId/friendList
// @desc:   Create new friend list
// @access: Public
router.post('/', async (req, res) => {
  const list = new FriendList({
    title: req.body.title,
    userId: mongoose.Types.ObjectId(req.params.userId),
    friendIds: req.body.friendIds.map((id) => mongoose.Types.ObjectId(id)),
  });
  list
    .save()
    .then(() => getUserLists(req.params.userId))
    .then((result) => res.json(result))
    .catch((err) => {
      throw err;
    });
});

// @route:  DELETE /users/:userId/friendList/:listId
// @desc:   Delete friend list
// @access: Public
router.delete('/:listId', async (req, res) => {
  const listId = req.params.listId;
  const list = await FriendList.findById(listId);
  list
    .remove()
    .then(() => getUserLists(req.params.userId))
    .then((result) => res.json(result))
    .catch((err) => {
      throw err;
    });
});

// @route:  PUT /users/:userId/friendList/:listId
// @desc:   Update friend list
// @access: Public
router.put('/:listId', async (req, res) => {
  const listId = req.params.listId;
  let list = await FriendList.findById(listId);
  if (!list) {
    res.status(400).json({ error: 'List not found' });
    return;
  }

  list.title = req.body.title;
  list.friendIds = req.body.friendIds.map((id) => mongoose.Types.ObjectId(id));

  list
    .save()
    .then(() => getUserLists(req.params.userId))
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(500).json({ error: err.message });
      throw err;
    });
});

module.exports = router;
