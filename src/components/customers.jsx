import React from "react";
import { Link } from "react-router-dom";
import createImg from "../assets/create.jpeg";
import shopImg from "../assets/shop.jpeg";

const Customers = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="main-create-pic">
            <Link to="/create">
              <button className="main-create-pic-button">
                <img className="create-pic" src={createImg} alt="create-pic" />
                <span className="text-pic-create">Create</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="main-shop-pic">
            <Link to="/shop">
              <button className="main-shop-pic-button">
                <img className="shop-pic" src={shopImg} alt="shop-pic" />
                <span className="text-pic-shop">Shop</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
