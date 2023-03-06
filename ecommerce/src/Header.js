import React, { useState } from "react";
import logo from "./Images/music-logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Header.css";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(true);
  const [{ basket_count }, dispatch] = useStateValue();

  const toggleSearchBar = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      {openSearch && (
        <React.Fragment>
          <div className="header__nav">
            <div className="header__option">
              <SearchIcon
                onClick={toggleSearchBar}
                className="header__openSearchIcon"
              />
            </div>

            <div className="header__option">
              <span className="header__optionLineOne">Hello Guest</span>
              <Link to="/signUp">
                <span className="header__optionLineTwo">Sign In</span>
              </Link>
            </div>
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
            <Link to="/checkout">
              <div className="header__optionBasket">
                <ShoppingCartIcon />
                {basket_count != 0 && (
                  <span className="basket_count">{basket_count}</span>
                )}
              </div>
            </Link>
          </div>
        </React.Fragment>
      )}
      {!openSearch && (
        <div className="header__search">
          <input type="text" className="header__searchInput" />
          <SearchIcon className="header__searchIcon" />
          <div className="header__option" style={{ textAlign: "center" }}>
            <CloseIcon
              className="header__closeIcon"
              onClick={toggleSearchBar}
            />
            <div className="header__optionLineOne">Close</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
