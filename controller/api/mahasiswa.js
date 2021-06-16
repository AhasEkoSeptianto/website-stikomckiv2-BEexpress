const mahasiswa = require('./../../models/mongodb/mahasiswa.js');


exports.allMhs = async (req, res) => {
	console.log(req.body);

	var allMhsShow = await mahasiswa.find().sort({nama:1}).skip((req.body.pages - 1) * 8).limit(8);

	// skip return nilai no awal dari dari table
	// misal request ke 1 maka akan direturn '8'-16
	var skip_col = (req.body.pages - 1) * 8;

	var allmhs = await mahasiswa.find();

	// return posisi page dari request dari berapa skip
	var posPages = req.body.pages;

	// ambil semua data dan dibagi / 8
	// hasil nya akan menjadi antara float (1.5) atau round (1)
	maxRound = allmhs.length / 8 ;

	// jika maxround adalah float "3.123" maka dibulatkan
	// jika max round lebih float maka akan direturn + 1
	maxPages =  maxRound > Math.round(maxRound) ?  Math.round( maxRound + 1 ) : Math.round( maxRound ) ;

 	res.send({result:'success', mhs: allMhsShow, firstNumb:skip_col, maxPages:maxPages, posPages: posPages, allMhs: allmhs});
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
	},{new: true})

	res.send({result: 'success', mahasiswa: mhs});
}

exports.deleteMhs = async (req, res) => {

	console.log(req.body)

	var mhs = await mahasiswa.deleteOne({_id: req.body.id}, (err) =>{
		if (err) return handleError(err);

		res.send({result: 'success'});

	})
}

exports.filterMhs = async (req, res) => {

	var mhs = req.body.mhs.toLowerCase();

	var filter_name = await mahasiswa.find({nama: mhs});
	if (filter_name.length > 0) {
		return res.send({msg:'oke', filter: filter_name})
	}

	var filter_jurusan = await mahasiswa.find({jurusan: mhs});
	if (filter_jurusan.length > 0) {
		res.send({msg:'oke', filter: filter_jurusan})
	}

	var filter_kelas = await mahasiswa.find({kelas: mhs});
	if (filter_kelas.length > 0) {
		res.send({msg:'oke', filter: filter_kelas})
	}

	var filter_alamat = await mahasiswa.find({alamat: mhs});
	if (filter_alamat.length > 0) {
		res.send({msg:'oke', filter: filter_jurusan})
	}

	var filter_notelp = await mahasiswa.find({notelp: mhs});
	if (filter_notelp.length > 0) {
		res.send({msg:'oke', filter: filter_notelp})
	}


	// jika number
	var mhs = mhs.replace(/\D+/g, '');

	var filter_nim = await mahasiswa.find({nim: mhs});
	if (filter_nim.length > 0) {
		res.send({msg:'oke', filter: filter_nim})
	}

	var filter_semester = await mahasiswa.find({semester: mhs});
	if (filter_semester.length > 0) {
		res.send({msg:'oke', filter: filter_semester})
	}
}