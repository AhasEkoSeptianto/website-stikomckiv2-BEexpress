const mongoose = require('mongoose');

const dosenSchema  = new mongoose.Schema({
	nid : { type: Number, unique: true, required:true },
	nama : { type: String, unique: true, required: true },
	email: { type: String, unique: true, required:true},
	alamat : { type: String, required: true },
	notelp : { type: String, required: true },
},{timestamps: true})

module.exports = dosen = mongoose.model("dosen_", dosenSchema);