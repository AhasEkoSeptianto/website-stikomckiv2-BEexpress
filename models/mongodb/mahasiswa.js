const mongoose = require('mongoose');

const newSchema  = new mongoose.Schema({
	nim : { type: String, unique: true, required:true },
	nama : { type: String, unique: true, required: true },
	jurusan : { type: String, required: true },
	semester : { type: Number, required: true },
	kelas : { type: String, required: true },
	alamat : { type: String, required: true },
	notelp : { type: String, required: true },
	tahun_ajaran: { type: String, required: true },
},{timestamps: true})

module.exports = mahasiswa = mongoose.model("mahasiswas", newSchema);