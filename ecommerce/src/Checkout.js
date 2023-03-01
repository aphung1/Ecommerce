import React from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import CheckoutEntry from "./CheckoutEntry";
import { getBasketTotal } from "./reducer";

const Checkout = () => {
  const [{ basket, basket_count }, dispatch] = useStateValue();

  console.log(basket);
  return (
    <div class="checkout">
      <h2 className="checkout__title">Your Shopping Basket</h2>
      <div className="checkout__body">
        <div className="checkout__left">
          {basket.map((element, i) => {
            return <CheckoutEntry key={i} {...element}></CheckoutEntry>;
          })}
        </div>
        <div className="checkout__right">
          <div className="checkout__summary">
            <div className="checkout__summary__row">
              <h2>Order Summary</h2>
              <h2>{basket_count} Item(s)</h2>
            </div>
            <hr />
            <div className="checkout__summary__row">
              <p>Item(s) subtotal</p>
              <p>$130.99</p>
            </div>
            <div className="checkout__summary__row">
              <p>Shipping</p>
              <p>TBD</p>
            </div>
            <div className="checkout__summary__row">
              <p>Subtotal</p>
              <p>TBD</p>
            </div>
            <div className="checkout__summary__row">
              <p>Estimated tax</p>
              <p>TBD</p>
            </div>
            <hr />
            <div className="checkout__summary__row">
              <h2>Order total</h2>
              <h2>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(getBasketTotal(basket))}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
