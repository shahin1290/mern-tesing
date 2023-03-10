const Basket = require("../models/basketModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addItemToBasket = catchAsyncErrors(async (req, res) => {
  const { productId, quantity } = req.query;

  let basket = await Basket.findOne({ buyerId: req.cookies.buyerId });
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const price = product.price;
  const name = product.name;

  if (basket) {
    const itemIndex = basket.items.findIndex(
      (item) => item.productId == productId
    );

    if (itemIndex > -1) {
      let product = basket.items[itemIndex];
      product.quantity += Number(quantity);
      basket.items[itemIndex] = product;
      await basket.save();
      res.status(200).send(basket);
    } else {
      basket.items.push({ productId, name, quantity, price });
      await basket.save();
      res.status(200).send(basket);
    }
  } else {
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    };

    res.cookie("buyerId", "63d228e5724dd807ace4f6b0", options);
    const newBasket = await Basket.create({
      buyerId: "63d228e5724dd807ace4f6b0",
      items: [{ productId, name, quantity, price }],
    });
    return res.status(201).send(newBasket);
  }
});

exports.getBasket = async (req, res) => {
  // const user = await User.findOne({ email: req.user.email }).exec();

  const user = { _id: "63d228e5724dd807ace4f6b0" };

  let basket = await Basket.findOne({ buyerId: user._id })
    .populate("items.product", "_id name price quantity")
    .exec();

  res.json({ buyerId: user._id, data: basket });
};

exports.removeItemFromBasket = catchAsyncErrors(async (req, res) => {
  const { productId, quantity } = req.query;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let basket = await Basket.findOne({ buyerId: req.cookies.buyerId });
  const itemIndex = basket.items.findIndex(
    (item) => item.productId == productId
  );
  if (itemIndex > -1) {
    let product = basket.items[itemIndex];
    product.quantity -= Number(quantity);
    if (product.quantity === 0) {
      basket.items.splice(itemIndex, 1);
    } else {
      basket.items[itemIndex] = product;
    }
    await basket.save();
    res.status(200).send(basket);
  } else {
    return next(new ErrorHandler("Item not found", 404));
  }
});
