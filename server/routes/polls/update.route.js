const express = require("express");
const router = express.Router();
const Poll = require("../../models/polls");
const upload = require("./utils");

// Route to update the title of the poll
router.post("/", (req, res) => {
	const title = req.body.title;
	const pollId = req.body.pollId;

	Poll.findByIdAndUpdate(pollId, { title: title }, (error) => {
		return res.status(400).json({ error: error });
	});

	return res.status(200).json({ status: "ok" });
});

// Router to update the image
router.post("/image", upload.any(), (req, res) => {
	// This method expects the name of the field to be the id of the image
	const image = req.files[0];
	const pollId = req.body.pollId;

	// Find the poll by it's id and update the child

	Poll.findById(pollId, (err, poll) => {
		if (err) return console.log(err);
		poll.updateImage(image.location, image.fieldname);
	});

	return res.status(200).json({ status: "ok" });
});

module.exports = router;
