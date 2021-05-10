const router = require("express").Router();
const parentController = require("../controllers/parentController");
const { verifyToken } = require("../controllers/authController");

router.get("/", parentController.getAllParents);
router.get("/me", verifyToken, parentController.getCurrentParent);
router.get("/:id", verifyToken, parentController.getSingleParent);
router.patch("/:id", verifyToken, parentController.updateParent);
router.delete("/:id", verifyToken, parentController.deleteParent);

module.exports = router;
