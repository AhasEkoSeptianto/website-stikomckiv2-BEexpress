const router = require("express").Router();
const isAuth = require('./../../midleware/auth')

// models
const User = require("./../../models/mongodb/users");
const CallUs = require("./../../models/mongodb/call_us");

// controller
const authController = require('./../../controller/api/auth');
const mahasiswaController = require('./../../controller/api/mahasiswa');
const broadcastController = require('./../../controller/api/broadcast');
const settingController = require('./../../controller/api/setting');

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

// mahasiswa dashboard
router.post('/mahasiswa', mahasiswaController.allMhs);
router.post('/mahasiswa/addMhs', mahasiswaController.addMhs );
router.post('/mahasiswa/findMhs', mahasiswaController.findMhs);
router.post('/mahasiswa/updateMhs', mahasiswaController.updateMhs);
router.post('/mahasiswa/deleteMhs', mahasiswaController.deleteMhs);
router.post('/mahasiswa/filterMhs', mahasiswaController.filterMhs);

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
