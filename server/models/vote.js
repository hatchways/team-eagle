const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  pollId: {
    type: Schema.Types.ObjectId,
    ref: 'polls',
  },
});

module.exports = Vote = mongoose.model('votes', VoteSchema);
