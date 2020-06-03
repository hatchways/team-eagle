const Poll = require('../../models/poll');

module.exports = async function validatePollVoteReq(req) {
  let isValid;
  let statusCode;
  let message;

  // Check and validate :imageIdx req param
  const imageIdx = req.params.imageIdx;
  if (imageIdx !== 0 || imageIdx !== 1) {
    isValid = false;
    statusCode = 401;
    message = 'You must include imageIdx in API URL. And it must be 0 or 1.';

    return { isValid, statusCode, message };
  }

  // Find poll using :pollId req param
  const poll = await Poll.findById(req.params.pollId);
  if (!poll) {
    isValid = false;
    statusCode = 404;
    message = 'Poll not found';

    return { isValid, statusCode, message };
  }

  // Find and validate poll author
  const pollAuthor = await poll.populate('userId');
  if (!pollAuthor) {
    isValid = false;
    statusCode = 400;
    message = 'Poll author is no longer active on this platform';

    return { isValid, statusCode, message };
  }

  // Check if requesting user is a friend of the author of the poll
  if (!pollAuthor.friendIds.includes(req.user._id)) {
    isValid = false;
    statusCode = 401;
    message = 'You must follow poll author to vote on their poll';

    return { isValid, statusCode, message };
  }

  isValid = true;
  return { isValid, statusCode, message };
};
