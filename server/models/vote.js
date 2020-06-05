const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    pollId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'polls',
    },
    pollImageIdx: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

VoteSchema.index({ userId: 1, pollId: 1 });

module.exports = Vote = mongoose.model('votes', VoteSchema);
