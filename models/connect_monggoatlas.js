const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	(err) => {
		if (err) throw err;
		console.log("MongoDB connection established");
	}
);
