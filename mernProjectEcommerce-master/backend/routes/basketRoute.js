const express = require("express");
const {
  getBasket,
  addItemToBasket,
  removeItemFromBasket,
} = require("../controllers/basketController");

const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/basket").get(getBasket);
router.route("/basket").post(addItemToBasket);
router.route("/basket").delete(removeItemFromBasket);

module.exports = router;
