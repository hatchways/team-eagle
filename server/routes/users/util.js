module.exports.parseArrOfUserObjs = (users) => {
  return users.map((user) => {
    return (({ _id, email, name, active }) => ({ _id, email, name, active }))(
      user
    );
  });
};
