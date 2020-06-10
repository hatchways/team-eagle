const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
    index: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  ],
});

module.exports = FriendList = mongoose.model('friendList', FriendListSchema);
