import React, { useContext } from "react";
import "./CakeDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import CakeItem from "../CakeItem/CakeItem";

const CakeDisplay = ({ category }) => {
  const { cake_list } = useContext(StoreContext);
  return (
    <div className="cake-display" id="cake-display">
      <h2>Our Cakes</h2>
      <div className="cake-display-list">
        {cake_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <CakeItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default CakeDisplay;
