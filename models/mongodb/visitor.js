const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	year: Number,
	month: {
		Januari: Number,
		februari: Number,
		maret: Number,
		april: Number,
		mei: Number,
		juni: Number,
		juli: Number,
		agustus: Number,
		september: Number,
		oktober: Number,
		november: Number,
		desember: Number,
	}
});

module.exports = visitor = mongoose.model("visitor", userSchema);
