const express = require("express");
const router = express.Router();
const Poll = require("../../models/polls");

// Route to delete a poll
router.post("/", (req, res) => {
    const pollId = req.body.id;        
    console.log(pollId)
	Poll.findByIdAndDelete(pollId, (error) => {
		if (error) return res.status(400).send(error);
		else {            
            return res.status(200).json({ status: "ok" });
        }
	});
});

module.exports = router;
