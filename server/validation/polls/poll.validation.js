const mongoose = require('mongoose');
const Poll = require('../../models/poll');
const Vote = require('../../models/vote');

exports.validateGetPollReq = async function validateGetPollReq(req) {
  let isValid;
  let statusCode;
  let message;

  // Check that poll has a valid id
  const pollIdIsValid = await mongoose.isValidObjectId(req.params.pollId);
  if (!pollIdIsValid) {
    isValid = false;
    statusCode = 404;
    message = 'Poll not found';

    return { isValid, statusCode, message };
  }

  // Check that poll exists
  const poll = await Poll.findById(req.params.pollId).populate('userId').exec();
  if (!poll) {
    isValid = false;
    statusCode = 404;
    message = 'Poll not found';

    return { isValid, statusCode, message };
  }

  // Check that req author is friends with poll author
  const author = poll.userId;
  if (!author.friendIds.includes(req.user._id)) {
    isValid = false;
    statusCode = 401;
    message = `You must be ${author.name}'s friend/follower to see their poll`;

    return { isValid, statusCode, message };
  }

  // Check that req author is on poll's author friend list
  // (if poll is associated with friend list)
  if (poll.friendsList) {
    await poll.populate('friendsList').execPopulate();
    const friendsList = poll.friendsList;
    if (!friendsList.friends.includes(req.user._id)) {
      isValid = false;
      statusCode = 401;
      message = `You must be in ${author.name}'s friend list ("${friendsList.title}") to see their poll`;

      return { isValid, statusCode, message };
    }
  }

  const votes = await Vote.find({ pollId: req.params.pollId })
    .sort({ createdAt: -1 })
    .populate('userId', '_id name picture')
    .exec();

  isValid = true;
  return { poll, votes, isValid };
};

exports.validatePollVoteReq = async function validatePollVoteReq(req) {
  let isValid;
  let statusCode;
  let message;

  // Check and validate :imageIdx req param
  const imageIdx = Number(req.params.imageIdx);
  if (imageIdx !== 0 && imageIdx !== 1) {
    isValid = false;
    statusCode = 401;
    message = 'You must include imageIdx in API URL. And it must be 0 or 1.';

    return { isValid, statusCode, message };
  }

  // Find poll using :pollId req param
  const poll = await Poll.findById(req.params.pollId).populate('userId').exec();
  if (!poll) {
    isValid = false;
    statusCode = 404;
    message = 'Poll not found';

    return { isValid, statusCode, message };
  }

  // Check that author still exists
  const author = poll.userId;
  if (!author) {
    isValid = false;
    statusCode = 404;
    message = 'Poll author account not found';

    return { isValid, statusCode, message };
  }

  // Check that users are friends
  const isFriendsWithPollAuthor = author.friendIds.includes(req.user._id);
  if (!isFriendsWithPollAuthor) {
    isValid = false;
    statusCode = 401;
    message = "Users must be friends to vote on each other's polls";

    return { isValid, statusCode, message };
  }

  isValid = true;
  return { poll, isValid };
};
