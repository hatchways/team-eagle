const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
    index: true,
  },
  pollId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'polls',
    index: true,
  },
  pollImageIdx: {
    type: Number,
    required: true,
  },
});

module.exports = Vote = mongoose.model('votes', VoteSchema);
