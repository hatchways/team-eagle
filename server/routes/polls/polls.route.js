const express = require('express');
const passport = require('passport');
const router = express.Router();

const Poll = require('../../models/poll');
const Vote = require('../../models/vote');
const upload = require('./utils');
const validatePollVoteReq = require('../../validation/polls/vote.validation');

// @route POST /polls
// @desc To add a new poll
// @access private
// @params title, userId, imagess x 2
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  (req, res) => {
    const errors = [];
    if (!req.body.title) errors.push({ title: 'Invalid title' });
    if (req.files.length != 2)
      errors.push({ images: 'minimum two images required' });

    if (errors.length > 0) return res.status(400).json({ error: errors });
    const poll = new Poll({
      title: req.body.title,
      userId: req.user._id,
      friendList: req.body.friendList,
    });
    // Trying to save the poll
    try {
      poll.save();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    // Saving file location to the poll object
    try {
      req.files.map((item) => {
        poll.addImage(item.location);
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ poll: poll });
  }
);

// @route DELETE "/polls"
// @desc to be delete a poll with a given pollId
// @params pollId
// @access private
router.delete(
  '/:pollId',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const pollId = req.params['pollId'];
    Poll.findById(pollId, function (err, poll) {
      if (err) return next(err);

      if (!poll.userId.equals(req.user._id)) {
        return res.status(400).send({ error: 'Unauthorized deletion' });
      }

      poll
        .remove()
        .then(() => res.status(200).json({ status: 'Ok' }))
        .catch(next);
    });
  }
);

// @route PUT /polls
// @desc Updates the title and friend list
// @params pollId
// @access Private
// @caution form trying to use this, will always have to be a enctype="multipart/form-data"
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { _id, title, friendList } = req.body;
    Poll.updateOne(
      { _id },
      {
        $set: {
          title,
          friendList,
        },
      },
      (err, result) => {
        if (err) return res.status(400).send({ error: err });
        return res.send({ message: 'Ok' });
      }
    );
  }
);

// @route GET /polls
// @desc To fetch the polls of user (not friends)
// @params none
// @access private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    let polls = [];
    Poll.find({ userId: user._id }, (err, docs) => {
      if (err) return res.status(400).send(err);
      polls = polls.concat(docs);
      return res.status(200).json(polls);
    });
  }
);

// @route GET /votable
// @desc To get polls that the a logged in user can vote on
// @params None
// @access private
router.get(
  '/votable',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let polls = [];
    // Have to implement logic for checking which friendLists the user is part of and then use that
    // Because friendList not there
    // Logic to find polls with empty friendLists
    Poll.find(
      {
        $or: [{ friendsLists: '' }, { friendsLists: { $exists: false } }],
      },
      (err, docs) => {
        if (err) return res.status(400).json({ error: err });
        polls = polls.concat(docs);
        return res.status(200).json({ polls });
      }
    );
  }
);

// @route GET /polls/friends
// @desc To fetch the polls of user's friends
// @params none
// @access private
router.get(
  '/friends',
  passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const user = req.user;
    const friends = user.friendIds;
    let polls = [];

    Poll.find({ userId: { $in: friends } }, (err, docs) => {
      if (err) return res.status(400).json({ error: err });
      polls = polls.concat(docs);
    });

    return res.status(200).json({ polls: polls });
  }
);

// @route GET /polls/:pollId
// @desc To fetch a single poll using pollId
// @params none
// @access private
router.get(
  '/:pollId',
  passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    return res.status(200).json(poll);
  }
);

// @route POST /polls/:pollId/:imageIdx/vote
// @desc To vote on poll
// @params none
// @access private
router.post(
  '/:pollId/:imageIdx/vote',
  passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const { isValid, statusCode, message } = await validatePollVoteReq(req);

    if (!isValid) {
      return res.status(statusCode).json({ message: message });
    }

    const vote = new Vote({
      userId: req.user._id,
      pollId: req.params.pollId,
      pollImageIdx: imageIdx,
    });
    await vote.save();

    if (!vote) {
      return res.status(400).json({ message: 'Vote failed to save' });
    }

    // increase numVotes in poll
    poll.images[imageIdx].numVotes += 1;
    await poll.save();

    return res.status(200).json(poll);
  }
);

// @route DELETE /polls/:pollId/:imageIdx/vote
// @desc To delete vote on poll
// @params none
// @access private
router.delete(
  '/:pollId/:imageIdx/vote',
  passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const { isValid, statusCode, message } = await validatePollVoteReq(req);

    if (!isValid) {
      return res.status(statusCode).json({ message: message });
    }

    const vote = await Vote.find({
      $and: [{ userId: req.user._id }, { pollId: req.params.pollId }],
    });

    if (!vote) {
      return res.status(404).json({ message: 'Failed to find vote' });
    }

    await vote.remove();

    // decrease numVotes in poll
    if (poll.images[imageIdx].numVotes > 0) poll.images[imageIdx].numVotes -= 1;
    await poll.save();

    return res.status(200).json(poll);
  }
);

module.exports = router;
