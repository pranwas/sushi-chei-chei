const Order = require("../models/Order");
const mongoose = require("mongoose");

//@desc         Get All Order
//@route        GET /api/v1/menu
//@access       Public

exports.getAllOrder = async (req, res, next) => {
  const order = await Order.find({});
  return res.status(200).json({ success: true, data: order });
};

exports.submitNewOrder = async (req, res, next) => {
  try {
    const { table, status, name, price, quantity, category } = req.body;

    // check if all required fields are provided
    if (!table || !status || !name || !price || !quantity || !category) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields.",
        });
    }

    // create a new order object
    const newOrder = new Order({
      table,
      status,
      orderItem: {
        name,
        price,
        quantity,
        category,
      },
    });

    // save the new order to the database
    const order = await newOrder.save();

    return res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "External server error" });
  }
};

exports.changeOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // check if status is provided
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a status." });
    }

    // find and update the order by the provided id
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    // if the desired order is not found
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // if the update is successful (scenario case success from document p'nick)
    return res.status(200).json({ success: true, data: "Success" });
  } catch (error) {
    // if there is an error during the update process (scenario case error from document p'nick)
    return res
      .status(500)
      .json({ success: false, data: "External server error" });
  }
};

exports.getAllOrderByTableNumber = async (req, res, next) => {
  try {
    const tableNumber = req.params.table;

    // find all orders on the specified table
    const order = await Order.find({ table: tableNumber });

    // if there are no orders on the specified table
    if (!order || order.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this table." });
    }

    // create json response from order data
    // const orderData = orders.map((order) => ({
    //   name: order.orderItem.name,
    //   price: order.orderItem.price,
    //   quantity: order.orderItem.quantity,
    //   category: order.orderItem.category,
    // }));

    let responseData;

    // Check if the route is /tableNumber
    if (req.originalUrl.includes("/:table")) {
      // create json response from order data
      responseData = order.map((order) => ({
        name: order.orderItem[0].name,
        price: order.orderItem[0].price,
        quantity: order.orderItem[0].quantity,
        category: order.orderItem[0].category,
      }));
    } else {
      // create json response from all orders data
      responseData = order.map((order) => order.orderItem);
    }

    return res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "External server error" });
  }
};
