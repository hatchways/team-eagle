const FriendList = require('../../models/friendList');

const getUserLists = (userId) => {
  return new Promise((resolve, reject) => {
    FriendList.find({ userId }, (err, docs) => {
      if (err) reject(err);
      if (docs) {
        FriendList.populate(docs, {
          path: 'friends',
          select: ['name', 'active'],
        })
          .then((result) => resolve(result))
          .catch((err) => reject(err));
      }
    });
  });
};

module.exports = getUserLists;
