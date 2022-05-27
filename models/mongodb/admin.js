const mongoose = require("mongoose");

const AdminScema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
	time: { type: Date, default: Date.now },
});

module.exports = guest = mongoose.model("admin", AdminScema);
