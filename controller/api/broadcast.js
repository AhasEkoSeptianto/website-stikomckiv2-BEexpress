
const fs = require('fs');
const News = require("./../../models/mongodb/news");
const drive = require('../../config/myMediaGDrive')
const oauth2Client = require('../../config/myMediaGDrive')
const { google } = require('googleapis')
const { listFile, uploadMedia, DeleteMedia } = require('../../config/myMediaGDrive')

exports.addNews = async (req, res) => {

	const data = {
		judul: req.body.judul,
		isiText: req.body.isiText,
		imgUrl: req.body.imgUrl,
		MediaId: req.body.MediaId
	};

	const news = new News({
		title: data.judul,
		content: data.isiText,
		imageUrl: data.imgUrl,
		MediaId: data.MediaId
	});
	news.save();
	res.send({ message: "Success Create Article" });
};

exports.allData = (req, res) => { 
	let news = News.find({}, (err,newsDB)=> {
		res.status(200).send(newsDB);
	})
};

exports.addImage = async (req, res) => {
	
	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" });
	}
	let uploadedID = await uploadMedia(req.files.file)

	// const myFile = req.files.file;
	// myFile.mv(`${__dirname}/../../public/${myFile.name}`, function (err) {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(500).send({ msg: "Error occured" });
	// 	}

	// 	return res.send({
	// 		status: true,
	// 		name: myFile.name,
	// 		path: `/${myFile.name}`,
	// 	});
	// });
	return res.send({
		status: true,
		name: req.files.name,
		path: `https://drive.google.com/uc?id=${uploadedID}`,
		MediaId: uploadedID
	});
}

exports.deleteNews = async (req, res) => {

	var dltNews = await News.findOne({_id: req.body.id});

	// fs.unlink(`${__dirname}/../../public/${dltNews.imageUrl}`, (err) => {
	// 	if (err) throw err;
	// })
	await DeleteMedia(req.body.MediaId)
	await News.deleteOne({_id: req.body.id});

	res.send({result: 'success', message: 'Success Delete Media'});


}