import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import "./HomeProduct.css";
import { useStateValue } from "./context/StateProvider";

const HomeProduct = ({ id, title, img, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    console.log("button");
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        img: img,
        price: price,
        rating: rating,
        quantity: 1,
      },
    });
  };

  return (
    <div className="HomeProduct">
      <img src={img} alt="" />
      <br />
      <h2>{title}</h2>
      <br />
      <small>
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)}
      </small>
      <br />
      {Array(Math.floor(rating))
        .fill()
        .map((_, i) => (
          <StarIcon key={i} />
        ))}{" "}
      {rating % 1 == 0.5 && <StarHalfIcon />}
      <br />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default HomeProduct;
