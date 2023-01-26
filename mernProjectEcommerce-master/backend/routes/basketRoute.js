const express = require("express");
const {
  getBasket,
  addItemToBasket,
} = require("../controllers/basketController");

const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/basket").get(getBasket);
router.route("/basket").post(addItemToBasket);

module.exports = router;
