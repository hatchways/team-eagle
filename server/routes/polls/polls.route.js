const express = require('express');
const router = express.Router();
const Poll = require('../../models/polls');
const upload = require('./utils');

// @route POST /polls
// @desc To add a new poll
// @access private
// @params title, userId, imagess x 2
router.post('/', upload.any(), (req, res) => {
  const errors = [];
  if (!req.body.title) errors.push({ title: 'Invalid title' });
  if (!req.body.userId) errors.push({ userId: 'Invalid user id' });
  if (req.files.length != 2)
    errors.push({ images: 'minimum two images required' });

  if (errors.length > 0) return res.status(400).json({ error: errors });
  const poll = new Poll({
    title: req.body.title,
    userId: req.body.userId,
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
});

// @route DELETE "/polls"
// @desc to be delete a poll with a given pollId
// @params pollId
// @access private
router.delete('/:pollId', (req, res) => {
  const pollId = req.params['pollId'];
  Poll.findById(pollId, function (err, poll) {
    if (err) return res.status(400).json({ error: 'poll not found' });
    else poll.remove();
    return res.status(200).json({ status: 'ok' });
  });
});

// @route PUT /polls/update
// @desc To update the image of a given poll
// @params image [name attributes should equal to  id of the existing image], pollId
// @access public [to be made private]
// @caution form trying to use this, will always have to be a enctype="multipart/form-data"
router.put('/:pollId', upload.any(), (req, res) => {
  const pollId = req.params['pollId'];
  const messages = [];

  Poll.findById(pollId, (err, poll) => {
    if (err) return console.log(err);
    // Update the title if the title exists
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
    if (messages.length > 0) return res.status(200).json({ status: messages });
    if (messages.length == 0)
      return res.status(200).json({ status: 'nothing to update' });
  });
});

module.exports = router;
