const mahasiswaModel = require('./../../models/mongodb/mahasiswa');

exports.mahasiswa = async (req, res) => {

	var year = new Date().getFullYear();
	var month = new Date().getMonth();

	var label = [];
	for (let i=5; i>0; i--){
		label.push( (year - i + 1) + ' - ' + (year - i + 2) )		
	}

	var mahasiswa = [];

	for (let i=0; i<5; i++) {
		var mhs = await mahasiswaModel.find({tahun_ajaran: label[i]});
		mahasiswa.push(mhs.length);
	}

	res.send({result: 'success', label: label, mahasiswa: mahasiswa});
}