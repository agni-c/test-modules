const express = require("express"),
	app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
//----------
require("dotenv").config();
app.use(express.json());

//Connecting to DB
mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log(err);
		}
		console.log("DB is connected");
	}
);

//Routes
const auth = require("./routes/auth");
app.use("/api", auth);

app.get("/", (req, res) => {
	res.json({ msg: "Hello World 🌏🌏" });
});

app.listen(port, () => {
	console.log(`port is listening to ${port}`);
});
