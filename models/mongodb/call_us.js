const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
	name: { type: String },
	email: { type: String },
	msg: { type: String },
	time: { type: Date, default: Date.now },
});

module.exports = guest = mongoose.model("call-us", guestSchema);
