const Order = require("../models/Order");
const mongoose = require("mongoose");

//@desc         Get All Order
//@route        GET /api/v1/order
//@access       Public

// get all orders with status not closed
// create websocket for real time update
exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ status: { $ne: "closed" } });
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, error: "External server error" });
  }
};

exports.submitNewOrder = async (req, res, next) => {
  try {
    const { table, orderItem } = req.body;
    const status = 'incoming'
    console.log(req.body);

    // check if orderItem is an array
    if (!Array.isArray(orderItem)) {
      return res
        .status(400)
        .json({ success: false, message: "Order item must be an array." });
    }

    // check if orderItem is empty
    if (orderItem.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Order item cannot be empty." });
    }

    // check if all required fields are provided
    if (!table) {
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
      orderItem: [...orderItem]
    });

    // save the new order to the database
    const order = await newOrder.save();

    console.log(order);

    return res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "External server error" });
  }
};

// type StatusType = "incoming" | "preparing" |  'completed' | 'canceled' | 'closed'

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

    // find all orders on the specified table that status is not closed
    const order = await Order.find({ table: tableNumber, status: { $ne: "closed" } });

    // if there are no orders on the specified table
    if (!order || order.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this table." });
    }

    const responseData = order.map((order) => {
        return {
          status: order.status,
          name: order.orderItem[0].name,
          price: order.orderItem[0].price,
          quantity: order.orderItem[0].quantity,
          category: order.orderItem[0].category,
        }
    });

    const flatData = responseData.flat(); // flatten the array

    return res.status(200).json({ success: true, data: flatData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "External server error" });
  }
};

// closed status by table number
exports.closeOrderByTableNumber = async (req, res, next) => {
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

    // update all orders on the specified table to closed status
    const updatedOrder = await Order.updateMany(
      { table: tableNumber },
      { status: "closed" }
    );

    return res.status(200).json({ success: true, data: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "External server error" });
  }
};