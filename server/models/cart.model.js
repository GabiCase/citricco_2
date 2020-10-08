const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    total: {
      type: Number,
      default: 0,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },

        quantity: {
          type: Number,
          default: 0,
        },

        price: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
