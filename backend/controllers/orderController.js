import jwt from "jsonwebtoken";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.id;

    console.log("Decoded Token:", decodedToken);

    const newOrder = new Order({
      userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    console.log("New Order:", newOrder);

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "vnd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2000,
      },
      quantity: 1,
    });

    console.log("Line Items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe Session:", session);

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order paid successfully" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order not paid" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders })
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });

  }
}

// api for updating order status
const updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({success:true, message: "Status updated"})
  } catch (error) {
    console.log(error);
    res.json({succes: false, message: "Error"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };
