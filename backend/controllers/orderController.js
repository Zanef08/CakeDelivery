// orderController.js

// import Order from "../models/orderModel";
// import User from "../models/userModel";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  // const frontend_url = "http://localhost:5173";
  // try {
  //   const newOrder = new Order({
  //     userId: req.body.userId,
  //     items: req.body.items,
  //     amount: req.body.amount,
  //     address: req.body.address,
  //   });
  //   await newOrder.save();

  //   // Clear cartData for the user after placing order
  //   await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

  //   const line_items = req.body.items.map((item) => ({
  //     price_data: {
  //       currency: "usd", // Update currency if necessary
  //       product_data: {
  //         name: item.name,
  //       },
  //       unit_amount: item.price * 100, // Convert to cents
  //     },
  //     quantity: item.quantity,
  //   }));
  //   line_items.push({
  //     price_data: {
  //       currency: "vnd", // Update currency if necessary
  //       product_data: {
  //         name: "Delivery charges",
  //       },
  //       unit_amount: 2000, // Assuming delivery charge in cents
  //     },
  //     quantity: 1,
  //   });

  //   const session = await stripe.checkout.sessions.create({
  //     line_items: line_items,
  //     mode: "payment",
  //     success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
  //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
  //   });

  //   res.json({ success: true, session_url: session.url });
  // } catch (error) {
  //   console.error("Error placing order:", error);
  //   res.json({ success: false, message: "Failed to place order" });
  // }
};

export { placeOrder };
