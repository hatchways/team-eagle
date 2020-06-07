const FriendList = require('../../models/friendList');

const getUserLists = (userId) => {
  return new Promise((resolve, reject) => {
    FriendList.find({ userId }, (err, docs) => {
      if (err) reject(err);
      FriendList.populate(docs, {
        path: 'friendIds',
        select: ['name', 'active'],
      })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  });
};

module.exports = getUserLists;
