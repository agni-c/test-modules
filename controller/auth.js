const User = require("../config/schemas/auth");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
	//creating a user
	req.body = { ...req.body, password: bcrypt.hashSync(req.body.password, 10) };
	const user = new User(req.body);
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.json({ err }).status(400);
	}
};

exports.signin = async (req, res) => {
	//Checking if username already exists
	const user = await User.findOne({ username: req.body.username });
	if (!user) return res.status(400).send("Id is wrong");
	//User password
	if (!bcrypt.compareSync(req.body.password, user.password)) {
		return res.status(400).json({
			err: "Password didn't match",
		});
	}
	const { _id, username } = user;
	//Jwt token authentication and assign token
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	res.header("auth-token", token).json({ token, user: { _id, username } });
};
