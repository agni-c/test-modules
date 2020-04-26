const router = require("express").Router();
const { signup, signin } = require("../controller/auth");
const { private } = require('../controller/middleware');

router.post("/signup", signup);
router.post("/signin", signin);

//private route example
router.get("/", private, (req, res) => {
	res.json({ message: "you got token, you got access🔑🔑" });
});

module.exports = router;
