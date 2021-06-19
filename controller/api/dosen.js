const dosenModel = require('./../../models/mongodb/dosen');

exports.allDosen = async (req, res) => {
	var allDosenShow = await dosenModel.find().sort({nama:1}).skip((req.body.pages - 1) * 8).limit(8);

	// skip return nilai no awal dari dari table
	// misal request ke 1 maka akan direturn '8'-16
	var skip_col = (req.body.pages - 1) * 8;

	var allDosen = await dosenModel.find();

	// return posisi page dari request dari berapa skip
	var posPages = req.body.pages;

	// ambil semua data dan dibagi / 8
	// hasil nya akan menjadi antara float (1.5) atau round (1)
	maxRound = allDosen.length / 8 ;

	// jika maxround adalah float "3.123" maka dibulatkan
	// jika max round lebih float maka akan direturn + 1
	maxPages =  maxRound > Math.round(maxRound) ?  Math.round( maxRound + 1 ) : Math.round( maxRound ) ;

 	res.send({result:'success', dosen: allDosenShow, firstNumb:skip_col, maxPages:maxPages, posPages: posPages, allDosen: allDosen});

}

exports.addDosen = async (req, res) => {

	// get data request
	var { nama, email, alamat, notelp } = req.body;

	// mengambil max nid dosen pada table
	var dosen = await dosenModel.find({}).sort({nid: -1}).limit(1);
	var nid = 0;

	// nid dosen akan diincrement jika database baru maka dibuat yang baru
	dosen.length < 1 ? nid = 20110710001 : nid = parseInt(dosen[0].nid + 1);

	var newDosen = new dosenModel({
		nid: nid,
		nama: nama.toLowerCase().trim(),
		email: email.trim(),
		alamat: alamat.toLowerCase().trim(),
		notelp: notelp.trim(),
	})

	try {
		await newDosen.save();
		res.send({result:'success', dosen: newDosen});
	} catch(err) {

		if (err.keyValue['nama']) {
			res.send({result: 'duplicate', exist: 'nama', msg: 'nama has exist'})
		}
		if (err.keyValue['email']) {
			res.send({result: 'duplicate', exist: 'email', msg: 'email has exist'})
		}

	}
}

exports.delete_dosen = async (req, res) => {

	var dosen = dosenModel.findOneAndRemove({_id: req.body.id}, (err, dosen) => {
		if (err) {
			throw new err;
		}

		res.send({result: 'success', dosen: dosen});
	})

}

exports.find_dosen = async (req, res) => {

	var dosen = await dosenModel.findOne({_id: req.body.id}, (err, dosen) => {
		if (err) {
			res.send({result: 'failed'})
		}

		res.send({result: 'success', dosen: dosen});

	})

}

exports.update_dosen = async (req, res) => {

	var update_dosen = await dosenModel.findOneAndUpdate({
		_id: req.body.id
	}, {
		nid: req.body.nid,
		nama: req.body.nama,
		email: req.body.email,
		alamat: req.body.alamat,
		notelp: req.body.notelp,
	} , {new : true, useFindAndModify: false});

	res.send({status: 'ok', dosen: update_dosen});

}

exports.filter_dosen = async (req, res) => {

	var filter_dosen = req.body.filter.toLowerCase().trim();
	if (typeof(filter_dosen) === 'string') {

		var filter_nama = await dosenModel.find({nama: filter_dosen});
		if (filter_nama.length > 0) {
			res.send({msg:'oke', filter: filter_nama})
		}

		var filter_alamat = await dosenModel.find({alamat: filter_dosen});
		if (filter_alamat.length > 0) {
			res.send({msg:'oke', filter: filter_alamat})
		}

		var filter_email = await dosenModel.find({email: filter_dosen});
		if (filter_email.length > 0) {
			res.send({msg:'oke', filter: filter_email})
		}
	} else if (typeof(filter_dosen) === 'number') {

		var filter_dosen = parseInt(filter_dosen.replace(/\D+/g, ''));

		var filter_nid = await dosenModel.find({nid: filter_dosen});
		if (filter_nid.length > 0) {
			return res.send({msg:'oke', filter: filter_nid})
		}

		var filter_notelp = await dosenModel.find({notelp: filter_dosen});
		if (filter_notelp.length > 0) {
			res.send({msg:'oke', filter: filter_notelp})
		}
	}

}