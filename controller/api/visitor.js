var VisitorModel = require('./../../models/mongodb/visitor');




exports.Setinfo = async (req, res) => {

	var month = await new Date().getMonth();
	var year = await new Date().getFullYear();

	var monthNames = ["januari", "februari", "maret", "april", "mei", "juni",
	"juli", "agustus", "september", "oktober", "november", "desember"
	];
	month = monthNames[month];

	var visitor = await VisitorModel.findOne({year:year}, async (err, monthDB) =>{
		
		// jika tahun skg tidak ditemukan maka dibuat tahun baru
		if (monthDB?.length < 1) {
			let newVisitor =  new VisitorModel({
				year: year,
				month: {
					januari: 0,
					februari: 0,
					maret: 0,
					april: 0,
					mei: 0,
					juni: 0,
					juli: 0,
					agustus: 0,
					september: 0,
					november: 0,
					desember: 0,
				}
			})

			newVisitor.save();
			return 'success create new visitor';
		}

		// jika ada maka akan diincrement berdasarkan bulan
		let numbVisitor = monthDB?.month[month];
		if (monthDB){
			monthDB.month[month] = numbVisitor + 1 ;
			monthDB?.save();
		}

	})

	res.send({result: 'success', month: month ? month : []});
}

exports.Getinfo = async (req, res) => {

	var month = await new Date().getMonth();
	var year = await new Date().getFullYear();

	var monthNames = ["januari", "februari", "maret", "april", "mei", "juni",
	"juli", "agustus", "september", "oktober", "november", "desember"
	];

	month = monthNames[month];

	var resVisitor = 0;

	var visitor = await VisitorModel.find({year: year }, (err, monthDB) => {
		resVisitor = monthDB?.[0]?.month?.[month];
	})

	res.send({result: 'success', visitor:resVisitor})
}