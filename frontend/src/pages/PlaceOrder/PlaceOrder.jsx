import React, { useContext, useState, useEffect } from "react";
import { formatPrice } from "../../utils/Utils";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cake_list, cartItems, url } =
    useContext(StoreContext);
  const totalCartAmount = getTotalCartAmount();
  const deliveryFee = totalCartAmount === 0 ? 0 : 2000;
  const finalTotal = totalCartAmount + deliveryFee;

  const [data, setData] = useState({
    userName: "",
    address: "",
    phone: "",
    dateTime: "",
   
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    cake_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: finalTotal,
    };

    const orderUrl = url + "/api/order/place";
    console.log("Placing order to URL:", orderUrl);
    console.log("Order Data:", orderData);

    try {
      let response = await axios.post(orderUrl, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Order placement failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
      alert("Error placing order");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || totalCartAmount === 0) {
      navigate("/cart");
    }
  }, [token, totalCartAmount, navigate]);

  return (
    <div>
      <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="userName"
              onChange={onChangeHandler}
              value={data.userName}
              type="text"
              placeholder="User name"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="tel"
            placeholder="Phone"
          />
          <input
            required
            name="address"
            onChange={onChangeHandler}
            value={data.address}
            type="text"
            placeholder="Adress"
          />

          <div className="multi-fields">
            <input
              required
              name="dateTime"
              onChange={onChangeHandler}
              value={data.dateTime}
              type="datetime-local"
              placeholder="Delivery Date and Time"
            />
          
          </div>
        
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{formatPrice(totalCartAmount)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{formatPrice(deliveryFee)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{formatPrice(finalTotal)}</b>
              </div>
            </div>
            <button type="submit">Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
