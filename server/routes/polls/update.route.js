const express = require("express");
const router = express.Router();
const Poll = require("../../models/polls");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

// Route to update the title of the poll
router.post("/", (req, res) => {
	const title = req.body.title;
	const pollId = req.body.pollId;

	Poll.findByIdAndUpdate(pollId, { title: title }, (error) => {
		return res.status(400).json({ error: error });
	});

	return res.status(200).json({ status: "ok" });
});

const s3 = new aws.S3({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

// Middleware to upload the image
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "hatchways-social-app",
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString() + "-" + file.originalname);
		},
	}),
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
