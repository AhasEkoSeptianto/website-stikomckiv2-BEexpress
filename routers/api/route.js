import express from "express";

import isAuth from "../../midleware/auth.js";

// Models
import User from "../../models/mongodb/users.js";
import CallUs from "../../models/mongodb/call_us.js";

// Controllers
import authController from "../../controller/api/auth.js";
import adminController from "../../controller/api/admin.js";
import mahasiswaController from "../../controller/api/mahasiswa.js";
import dosenController from "../../controller/api/dosen.js";
import broadcastController from "../../controller/api/broadcast.js";
import settingController from "../../controller/api/setting.js";
import MediaController from "../../controller/api/media.js";
import VisitorController from "../../controller/api/visitor.js";
import StatistikController from "../../controller/api/statistik.js";

const router = express.Router();

// Visitor
router.get("/visitor", VisitorController.Setinfo);
router.get("/getvisitor", VisitorController.Getinfo);

// Statistik
router.get("/mhs-statistik", StatistikController.mahasiswa);

// Login
router.post("/login", authController.login);
router.post("/is-auth", isAuth, authController.is_auth);

// Admin
router.get("/admin", isAuth, adminController.Admin);
router.post("/admin/add", isAuth, adminController.AddAdmin);
router.put("/admin/edit", isAuth, adminController.EditAdmin);
router.delete("/admin/delete", isAuth, adminController.DeleteAdmin);

// Mahasiswa
router.get("/mahasiswa", isAuth, mahasiswaController.allMhs);
router.post("/mahasiswa/add", mahasiswaController.addMhs);
router.post("/mahasiswa/findMhs", mahasiswaController.findMhs);
router.put("/mahasiswa/update", mahasiswaController.updateMhs);
router.delete("/mahasiswa/delete", mahasiswaController.deleteMhs);
router.post("/mahasiswa/filter", mahasiswaController.filterMhs);

// Dosen
router.get("/dosen", dosenController.allDosen);
router.post("/dosen/add", dosenController.addDosen);
router.delete("/dosen/delete", dosenController.delete_dosen);
router.put("/dosen/update", dosenController.update_dosen);
router.post("/dosen/find_dosen", dosenController.find_dosen);
router.post("/dosen/filter_dosen", dosenController.filter_dosen);

// Broadcast
router.get("/broadcast/allData", broadcastController.allData);
router.post("/broadcast/addImage", broadcastController.addImage);
router.post("/broadcast/addNews", isAuth, broadcastController.addNews);
router.post("/broadcast/delete", isAuth, broadcastController.deleteNews);

// Setting
router.post("/setting/change-name", settingController.changeName);

// Call Us
router.post("/call-us", async (req, res) => {
  const newGuest = new User({
    name: req.body.name,
    email: req.body.email,
    msg: req.body.msg,
  });

  await newGuest.save();

  res.status(200).json({
    status: "success",
  });
});

// Google Media
router.get("/authorize-media", MediaController.AuthMediaLink);
router.post("/login-google", MediaController.GetTokenGoogle);

export default router;
