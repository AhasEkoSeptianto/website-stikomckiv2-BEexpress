const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
	title: { type: String },
	imageUrl: { type: String },
	content: { type: String },
	time_post: { type: Date, default: Date.now },
	update_post: { type: String },
});

module.exports = news = mongoose.model("news", newsSchema);
