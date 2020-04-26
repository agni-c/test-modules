require('dotenv').config();
const express = require("express"), app = express();
const connectDB = require('./config/db');
//----------
connectDB();
app.use(express.json());

//Routes
const routes = require("./routes/routes");
app.use("/api", routes);

app.get("/", (req, res) => {
	res.json({ msg: "Hello World 🌏🌏" });
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`server started`);
});
