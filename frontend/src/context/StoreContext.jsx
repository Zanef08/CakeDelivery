import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const url = "http://localhost:4000"; 
  const [token, setToken] = useState("");
  const [cake_list, setCakeList] = useState([]);

  const updateCartItemQuantity = async (itemId, action) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (action === "increase") {
        updated[itemId] = (updated[itemId] || 0) + 1;
        setShowAddToCartMessage(true);
      } else if (action === "decrease") {
        if (updated[itemId] > 1) {
          updated[itemId] -= 1;
        } else {
          delete updated[itemId];
        }
      }

      if (token) {
        const updateEndpoint =
          action === "increase" ? "/api/cart/add" : "/api/cart/remove";
        axios
          .post(
            url + updateEndpoint,
            { itemId },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch((error) => {
            console.error("Error while updating cart:", error);
          });
      }

      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = cake_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchCakeList = async () => {
    try {
      const response = await axios.get(url + "/api/cake/list");
      setCakeList(response.data.data);
    } catch (error) {
      console.error("Error while fetching cake list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error while fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (showAddToCartMessage) {
      const timeout = setTimeout(() => {
        setShowAddToCartMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showAddToCartMessage]);

  useEffect(() => {
    async function loadData() {
      await fetchCakeList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    cartItems,
    updateCartItemQuantity,
    getTotalCartAmount,
    showAddToCartMessage,
    url,
    token,
    setToken,
    cake_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
