const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    table: {
      type: Number,
      required: true,
    },
    orderItem: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// const OrderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     foodOrder: [{
//         food: {
//             type: mongoose.Schema.ObjectId,
//             ref: 'Menu',
//             required: true
//         },
//         status: {
//             type: String,
//             enum: ['todo', 'doing', 'done', 'cancelled'],
//             default: 'todo'
//         }
//     }],
//     status: {
//         type: String,
//         enum: ['on_going', 'paid'],
//         default: 'on_going'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
// });

module.exports = mongoose.model("Order", OrderSchema);
