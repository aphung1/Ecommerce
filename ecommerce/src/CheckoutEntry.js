import React from "react";
import "./CheckoutEntry.css";
import { useStateValue } from "./context/StateProvider";

const CheckoutEntry = ({ id, title, img, price, quantity, key }) => {
  const [{ basket }, dispatch] = useStateValue();

  const changeQuantity = (e) => {
    dispatch({
      type: "CHANGE_ITEM_QUANTITY",
      item: {
        id: id,
        quantity: e.target.value,
      },
    });
  };
  return (
    <div key={key} className="CheckoutEntry">
      <img src={img} alt="" />
      <div className="CheckoutEntry__text">
        <div className="CheckoutEntry__text__left">
          <h2>{title}</h2>
          <small>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </small>
        </div>
        <div className="CheckoutEntry__text__right">
          <h3>Quantity</h3>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            min="0"
            max="99"
            onChange={changeQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutEntry;
