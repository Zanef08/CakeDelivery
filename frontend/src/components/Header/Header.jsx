import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite cake here</h2>
        <p>
          Treat yourself to our delightful range of cakes, crafted with the
          finest ingredients. From classic flavors to innovative creations, our
          cakes are perfect for every occasion. Savor the sweetness and make
          your moments memorable.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
