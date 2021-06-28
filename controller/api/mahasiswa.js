const mahasiswa = require('./../../models/mongodb/mahasiswa.js');

exports.allMhs = async (req, res) => {

	var allMhsShow = await mahasiswa.find().sort({nama:1});

	res.send({status: 'ok', Mhs: allMhsShow});
}

exports.addMhs = async (req, res) => {

	var Nim = null ;

	// get max nim from db to set auto generated
	if (req.body.jurusan === "Teknik Informatika") {
		Nim = await mahasiswa.find({jurusan: "teknik informatika"}).sort({nim: -1}).limit(1);

		if (Nim.length === 0){
			Nim = 19110710000;
		} else {
			// increment nim
			Nim = Nim[0].nim + 1 ;
		}
	} else if (req.body.jurusan === "Sistem Informasi") {

		Nim = await mahasiswa.find({jurusan: "sistem informasi"}).sort({nim: -1}).limit(1);

		if (Nim.length === 0) {
			Nim = 19120710000;
		} else {
			// increment nim
			Nim = Nim[0].nim + 1 ;
		}
	}

	var tahunAjaran = new Date().getFullYear() + ' - ' + (new Date().getFullYear() + 1);


	var newMhs = new mahasiswa({
		nim: Nim,
		nama: req.body.nama.toLowerCase(),
		jurusan: req.body.jurusan.toLowerCase(),
		semester: req.body.semester,
		kelas: req.body.kelas.toLowerCase(),
		alamat: req.body.alamat.toLowerCase(),
		notelp: req.body.notelp,
		tahun_ajaran: tahunAjaran,
	});

	try {
		newMhs.save();
	} catch {
		newMhs = {msg: 'error'};
	}

	res.send({result: 'success', mhs: newMhs});
}

exports.findMhs = async (req, res) => {

	var mhs = await mahasiswa.find({_id: req.body.id});

	res.send({result: 'success', mahasiswa: mhs});

}

exports.updateMhs = async (req, res) => {

	var mhs = await mahasiswa.findOneAndUpdate({_id: req.body.id}, {
		nama: req.body.nama,
		jurusan: req.body.jurusan,
		semester: req.body.semester,
		kelas: req.body.kelas,
		alamat: req.body.alamat,
		notelp: req.body.notelp,
	},{new: true, useFindAndModify: false})

	res.send({result: 'success', mahasiswa: mhs});
}

exports.deleteMhs = async (req, res) => {


	var mhs = await mahasiswa.deleteOne({_id: req.body.id}, (err) =>{
		if (err) return handleError(err);

		res.send({result: 'success'});

	})
}

exports.filterMhs = async (req, res) => {

	var mhs = req.body.mhs.toLowerCase();
	var filteringByString = ['nama','jurusan','kelas','alamat'];
	var filteringByNumb = ['nim','semester','notelp'];

	filteringByString.forEach(async(val) => {
		let filter = await mahasiswa.find({[val]: mhs});
		if ( filter.length > 0 ) {
			res.send({status: 'ok', filter: filter})
		}
	})

	var mhs = mhs.replace(/\D+/g, '');
	filteringByNumb.forEach( async(val) => {
		if (val === 'notelp') {
			mhs = mhs.slice(1);
		}
		let filter = await mahasiswa.find({[val]: mhs});
		if ( filter.length > 0 ) {
			res.send({status: 'ok', filter: filter});
		}
	} )

}