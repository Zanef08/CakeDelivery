import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { formatPrice } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    cake_list,
    updateCartItemQuantity,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const totalCartAmount = getTotalCartAmount();
  const deliveryFee = totalCartAmount === 0 ? 0 : 2000;
  const finalTotal = totalCartAmount + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cake_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={url + "/images/" + item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <p>{item.name}</p>
                  <p>{formatPrice(item.price)}</p>
                  <div className="cart-item-counter">
                    <img
                      onClick={() =>
                        updateCartItemQuantity(item._id, "decrease")
                      }
                      src={assets.remove_icon_red}
                      alt="Decrease"
                      className="counter-button"
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      onClick={() =>
                        updateCartItemQuantity(item._id, "increase")
                      }
                      src={assets.add_icon_green}
                      alt="Increase"
                      className="counter-button"
                    />
                  </div>
                  <p>{formatPrice(item.price * cartItems[item._id])}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")}>Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
