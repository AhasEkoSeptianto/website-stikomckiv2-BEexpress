
const fs = require('fs');
const News = require("./../../models/mongodb/news");

exports.addNews = (req, res) => {
	
	const data = {
		judul: req.body.judul,
		isiText: req.body.isiText,
		imgUrl: req.body.imgUrl,
	};
	const news = new News({
		title: data.judul,
		content: data.isiText,
		imageUrl: data.imgUrl,
	});
	news.save();
	res.send({ msg: "succes" });
};

exports.allData = (req, res) => {
	let news = News.find({}, (err,newsDB)=> {
		res.status(200).send(newsDB);
	})
};

exports.addImage = (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" });
	}

	const myFile = req.files.file;
	myFile.mv(`${__dirname}/../../public/${myFile.name}`, function (err) {
		if (err) {
			console.log(err);
			return res.status(500).send({ msg: "Error occured" });
		}

		return res.send({
			status: true,
			name: myFile.name,
			path: `/${myFile.name}`,
		});
	});
}

exports.deleteNews = async (req, res) => {

	var dltNews = await News.findOne({_id: req.body.id});

	fs.unlink(`${__dirname}/../../public/${dltNews.imageUrl}`, (err) => {
		if (err) throw err;
	})

	await News.deleteOne({_id: req.body.id});

	res.send({result: 'success'});


}