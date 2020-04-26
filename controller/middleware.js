const jwt = require("jsonwebtoken");

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