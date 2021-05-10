const router = require("express").Router();
const childController = require("../controllers/childController");

router.get("/", childController.getAllChildren);
router.post("/", childController.createChild);
router.patch("/:id", childController.updateChild);
router.delete("/:id", childController.deleteChild);

module.exports = router;
