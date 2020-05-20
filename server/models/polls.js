const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	userId: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	images: [
		{
			url: {
				type: String,
				required: true,
			},
		},
	],
});

PollSchema.methods.addImage = function(imageLocation){
    this.images.push({url:imageLocation})
}

module.exports = Poll = mongoose.model("polls", PollSchema);
