const Order = require("../models/Order");
const mongoose = require("mongoose");

//@desc         Get All Order
//@route        GET /api/v1/menu
//@access       Public

exports.getAllOrder = async (req, res, next) => {
    const order = await Order.find({});
    return res.status(200).json({ success: true, data: order });
}