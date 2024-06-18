import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { formatPrice } from "../../utils/Utils";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2000;
  const total = getTotalCartAmount() + deliveryFee;

  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/order/place", {
        userId: "your_user_id_here", // Replace with actual user ID
        items: [], // Replace with actual items from cart
        amount: total, // Total amount to charge
        address: {}, // Replace with actual address form data
      });

      // Redirect to Stripe checkout page
      window.location = response.data.session_url;
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      // Handle error
    }
  };
  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name.." />
          <input type="text" placeholder="Last name.." />
        </div>
        <input type="text" placeholder="Phone" />
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{formatPrice(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{formatPrice(deliveryFee)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{formatPrice(total)}</b>
            </div>
          </div>
          <button onClick={handlePayment}>Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
