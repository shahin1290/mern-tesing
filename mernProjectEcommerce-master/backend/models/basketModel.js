const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const basketSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        pictureUrl: String,
        quantity: Number,
      },
    ],

    buyerId: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Basket", basketSchema);
