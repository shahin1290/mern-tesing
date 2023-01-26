const Basket = require("../models/basketModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");

exports.addItemToBasket = async (req, res) => {
  const { productId, quantity } = req.query;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const basket = await Basket.findOne({ buyerId: "63d228e5724dd807ace4f6b0" });

  let updatedBasket;

  if (!basket) {
    updatedBasket = await Basket.create({
      buyerId: "63d228e5724dd807ace4f6b0",
      items: [
        { productId, name: product.name, quantity, price: product.price },
      ],
    });
  }

  res.status(201).json({
    success: true,
    updatedBasket,
  });

  // let products = [];

  // const user = await User.findOne({ email: req.user.email }).exec();

  // // check if cart with logged in user id already exist
  // let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  // if (cartExistByThisUser) {
  //   cartExistByThisUser.remove();
  //   console.log("removed old cart");
  // }

  // for (let i = 0; i < cart.length; i++) {
  //   let object = {};

  //   object.product = cart[i]._id;
  //   object.count = cart[i].count;
  //   object.color = cart[i].color;
  //   // get price for creating total
  //   let { price } = await Product.findById(cart[i]._id).select("price").exec();
  //   object.price = price;

  //   products.push(object);
  // }

  // // console.log('products', products)

  // let cartTotal = 0;
  // for (let i = 0; i < products.length; i++) {
  //   cartTotal = cartTotal + products[i].price * products[i].count;
  // }

  // // console.log("cartTotal", cartTotal);

  // let newCart = await new Cart({
  //   products,
  //   cartTotal,
  //   orderdBy: user._id,
  // }).save();

  // console.log("new cart ----> ", newCart);
  // res.json({ ok: true });
};

exports.getBasket = async (req, res) => {
  // const user = await User.findOne({ email: req.user.email }).exec();

  const user = { _id: "63d228e5724dd807ace4f6b0" };

  let basket = await Basket.findOne({ buyerId: user._id })
    .populate("items.product", "_id name price quantity")
    .exec();

  res.json({ buyerId: user._id, basket });
};
