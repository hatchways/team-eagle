const express = require('express');
const router = express.Router();
const Poll = require('../../models/polls');
const upload = require('./utils');
const passport = require('passport');

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
  (req, res) => {
    const pollId = req.params['pollId'];
    Poll.findById(pollId, function (err, poll) {
      if (err) return res.status(400).json({ error: 'poll not found' });
      else if (poll._id != req.user._id)
        return res.status(400).json({ error: 'unauthorised deletion' });
      poll.remove();
      return res.status(200).json({ status: 'ok' });
    });
  }
);

// @route PUT /polls/update
// @desc To update the image of a given poll
// @params image [name attributes should equal to  id of the existing image], pollId
// @access public [to be made private]
// @caution form trying to use this, will always have to be a enctype="multipart/form-data"
router.put(
  '/:pollId',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  (req, res) => {
    const pollId = req.params['pollId'];
    const messages = [];

    Poll.findById(pollId, (err, poll) => {
      if (err) return console.log(err);
      // Update the title if the title exists
      else if (poll.userId != req.user._id)
        return res.status(400).json({ error: 'unauthorised deletion' });
      if (req.body.title) {
        if (req.body.title != poll.title) {
          poll.updateTitle(req.body.title);
          messages.push('title updated');
        }
      }
      // Update the images subdoc if files exist in request
      if (req.files.length > 0) {
        req.files.map((image) => {
          poll.updateImage(image.location, image.fieldname);
        });
        messages.push('images updated');
      }
      if (messages.length > 0)
        return res.status(200).json({ status: messages });
      if (messages.length == 0)
        return res.status(200).json({ status: 'nothing to update' });
    });
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
      if (err) return res.status(400).json({ error: err });
      polls = polls.concat(docs);
      return res.status(200).json({ polls });
    });
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

    return res.status(200).json();
  }
);

module.exports = router;
