import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { formatPrice } from "../../utils/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cake_list, cartItems, url } =
    useContext(StoreContext);
  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2000;
  const total = getTotalCartAmount() + deliveryFee;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    cake_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      userId: token,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2000,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First name.."
            onChange={onChangeHandler}
            value={data.firstName}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last name.."
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={data.phone}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="address"
            placeholder="Your Address"
            onChange={onChangeHandler}
            value={data.address}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="date"
            name="deliveryDate"
            onChange={onChangeHandler}
            value={data.deliveryDate}
          />
          <input
            required
            type="time"
            name="deliveryTime"
            onChange={onChangeHandler}
            value={data.deliveryTime}
          />
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
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
