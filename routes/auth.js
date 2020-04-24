const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { signup, signin, private } = require("../controller/auth");

router.post("/signup", signup);
router.post("/signin", signin);

//private route example
router.get("/", private, (req, res) => {
	res.json({ message: "you got token, you got access🔑🔑" });
});

module.exports = router;
