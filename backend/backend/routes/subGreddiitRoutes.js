const express = require("express");
const router = express.Router();
const {
  createSubGreddiit,
  getMySubGreddiits,
  getSubGreddiits,
  getSubGreddiitData,
  deleteSubGreddiit,
} = require("../controllers/subGreddiitController");
const { protect } = require("../middleware/authMiddleware");

router.post("/createSubGreddiit", protect, createSubGreddiit);
router.post("/getMySubGreddiits", protect, getMySubGreddiits);
router.post("/getSubGreddiits", protect, getSubGreddiits);
router.post("/getSubGreddiitData", protect, getSubGreddiitData);
router.post("/deleteSubGreddiit", protect, deleteSubGreddiit);

module.exports = router;
