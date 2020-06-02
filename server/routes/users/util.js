module.exports.parseArrOfUserObjs = (users) => {
  return users.map((user) => {
    return (({ _id, email, name }) => ({ _id, email, name }))(user);
  });
};
