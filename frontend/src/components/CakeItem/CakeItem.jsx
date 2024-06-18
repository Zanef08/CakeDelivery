import React, { useRef, useEffect, useState, useContext } from "react";
import "./CakeItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { formatPrice } from "../../utils/Utils";
import { notification } from "antd";

const CakeItem = ({ id, name, price, description, image }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    const element = nameRef.current;
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [name]);

  const { cartItems, updateCartItemQuantity, url } = useContext(StoreContext);

  const handleAddToCart = () => {
    updateCartItemQuantity(id, "increase");
    notification.open({
      message: "Added to cart!!!",
      duration: 0.7,
    });
  };

  return (
    <div className="cake-item">
      <div className="cake-item-img-container">
        <img
          className="cake-item-image"
          src={url + "/images/" + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="cake-item-counter">
            <img
              onClick={() => updateCartItemQuantity(id, "decrease")}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAddToCart}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="cake-item-info">
        <div className="cake-item-name-rating">
          <p ref={nameRef} className="cake-item-name">
            {name}
            {isTruncated && <span className="tooltip">{name}</span>}
          </p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="cake-item-desc">{description}</p>
        <p className="cake-item-price">{formatPrice(price)}</p>
      </div>
    </div>
  );
};

export default CakeItem;
