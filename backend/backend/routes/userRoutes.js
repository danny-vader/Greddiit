const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
  editUserData,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/getUserData", protect, getUserData);
router.post("/editUserData", protect, editUserData);
router.post("/deleteUser", protect, deleteUser);

module.exports = router;
