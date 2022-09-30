const router = require("express").Router();
const isAuth = require('./../../midleware/auth')
const express = require("express");
const app = express();
// models
const User = require("./../../models/mongodb/users");
const CallUs = require("./../../models/mongodb/call_us");

// controller
const authController = require('./../../controller/api/auth');
const adminController = require('./../../controller/api/admin')
const mahasiswaController = require('./../../controller/api/mahasiswa');
const dosenController = require('./../../controller/api/dosen');
const broadcastController = require('./../../controller/api/broadcast');
const settingController = require('./../../controller/api/setting');
const MediaController = require('./../../controller/api/media')

const VisitorController = require('./../../controller/api/visitor');

const StatistikController = require('./../../controller/api/statistik')

// info
router.get('/visitor', VisitorController.Setinfo);
router.get('/getvisitor', VisitorController.Getinfo);

// statistik
router.get('/mhs-statistik', StatistikController.mahasiswa);

// login
router.post("/login", authController.login );
router.post('/is-auth', isAuth, authController.is_auth );

// admin dashboard
router.get('/admin', isAuth , adminController.Admin)
router.post('/admin/add', isAuth, adminController.AddAdmin)
router.put('/admin/edit', isAuth, adminController.EditAdmin)
router.delete('/admin/delete', isAuth, adminController.DeleteAdmin)

// mahasiswa dashboard
router.get('/mahasiswa', isAuth, mahasiswaController.allMhs);
router.post('/mahasiswa/add', mahasiswaController.addMhs );
router.post('/mahasiswa/findMhs', mahasiswaController.findMhs);
router.put('/mahasiswa/update', mahasiswaController.updateMhs);
router.delete('/mahasiswa/delete', mahasiswaController.deleteMhs);
router.post('/mahasiswa/filter', mahasiswaController.filterMhs);

// dosen dashboard
router.get('/dosen', dosenController.allDosen);
router.post('/dosen/add', dosenController.addDosen);
router.delete('/dosen/delete', dosenController.delete_dosen);
router.put('/dosen/update', dosenController.update_dosen);
router.post('/dosen/find_dosen', dosenController.find_dosen);
router.post('/dosen/filter_dosen', dosenController.filter_dosen);

// broadcast dashboard
router.get("/broadcast/allData", broadcastController.allData);
router.post('/broadcast/addImage', broadcastController.addImage )
router.post("/broadcast/addNews", isAuth , broadcastController.addNews );
router.post('/broadcast/delete', isAuth, broadcastController.deleteNews);

// setting dashboard
router.post('/setting/change-name', settingController.changeName );



// call-us from website
router.post("/call-us", (req, res) => {
	const newGuest = new User({
		name: req.body.name,
		email: req.body.email,
		msg: req.body.msg,
	});
	newGuest.save();

	res.status(200).json({ status: "success" });
});

module.exports = router;
app.use(`/.netlify/functions/api`, router);

router.get('/authorize-media', MediaController.AuthMediaLink)
router.post('/login-google', MediaController.GetTokenGoogle)