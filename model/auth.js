const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1 } = require("uuid");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 10,
		},
		hash_password: {
			type: String,
			required: true,
		},
		salt: String,
	},
	{ timestamps: true }
);
//virtual field
userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password; // underscored(_) variables are used for making private variables
		this.salt = v1(); //using unique id to gen salt
		this.hash_password = this.securePassword(password);
	})
	.get(function () {
		return this._password;
	});
userSchema.methods = {
	authenticate: function (plainpassword) {
		return this.securePassword(plainpassword) === this.hash_password;
	},

	// from crypto docs
	securePassword: function (plainpassword) {
		if (!plainpassword) return " ";
		try {
			return crypto
				.createHmac("sha256", this.salt)
				.update(plainpassword)
				.digest("hex");
		} catch (err) {
			return " ";
		}
	},
};
module.exports = mongoose.model("User", userSchema);
