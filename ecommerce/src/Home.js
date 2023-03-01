import React from "react";
import Carousel from "./Carousel";
import HomeProduct from "./HomeProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products/featured");
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <Carousel />
      <div className="home__row">
        {products.map(({ _id, ...props }, i) => (
          <HomeProduct key={i} id={_id} {...props} />
        ))}
      </div>
      <div className="home__row"></div>
      <div className="home__row"></div>
    </div>
  );
};

export default Home;
