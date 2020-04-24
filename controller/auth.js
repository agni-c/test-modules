const User = require("../model/auth");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
	//creating a user
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
	if (!user.authenticate(req.body.password)) {
		return res.status(400).json({
			err: "Password didn't match",
		});
	}
	const { _id, username } = user;
	//Jwt token authentication and assign token
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	res.header("auth-token", token).json({ token, user: { _id, username } });
};
exports.private = (req, res, next) => {
	//Check for the token
	const token = req.header("auth-token");
	if (!token) return res.status(401).send("Access Denied");

	//Verify and giving pass
	try {
		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verifiedToken;
	} catch (error) {
		res.status(400).send("invalid token");
	}
	next();
};
