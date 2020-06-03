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
  },
  friendIds: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  ],
});

FriendListSchema.methods.updateList = function (title, friendIds) {
  this.title = title;
  this.friendIds = friendIds.map((id) => mongoose.Types.ObjectId(id));
  return this.save();
};

module.exports = FriendList = mongoose.model('friendList', FriendListSchema);
