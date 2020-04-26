const mongoose = require("mongoose");

module.exports = connectDB = () => {
	mongoose.connect(
		process.env.DBURL,
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
}
