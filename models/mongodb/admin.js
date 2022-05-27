const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const AdminScema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
	time: { type: Date, default: Date.now },
});

AdminScema.plugin(uniqueValidator, { message: '{PATH} must be unique' })
module.exports = guest = mongoose.model("admin", AdminScema);
