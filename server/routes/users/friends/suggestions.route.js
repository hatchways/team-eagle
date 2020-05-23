const express = require('express');
const router = express.Router();

const User = require('../../../models/User');

// @route:  GET /user/:userId/friends/suggested
// @desc:   Gets a list of suggested friends (random). Can take a query parameter
// @access: Public
router.get('/', async (req, res) => {
  console.log(req.query.name);
  const nameQuery = req.query.name;
  let suggestions;

  if (nameQuery) {
    suggestions = await User.find({
      name: new RegExp(nameQuery, 'i'),
    });
  } else {
    suggestions = await User.find({});
  }

  return res.status(200).json({ suggestions });
});

module.exports = router;
