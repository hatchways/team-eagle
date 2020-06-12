module.exports.parseArrOfUserObjs = (users) => {
  return users.map((user) => {
    return (({ _id, email, name, active, picture }) => ({
      _id,
      email,
      name,
      active,
      picture,
    }))(user);
  });
};
