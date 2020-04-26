const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 3,
		max: 10,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		required: true,
		type: Date,
		default: () => { return Date.now(); }
	}
});

module.exports = mongoose.model("User", userSchema);
