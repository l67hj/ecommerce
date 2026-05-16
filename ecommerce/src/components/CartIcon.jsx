import React from "react";
import { Link } from "react-router-dom";
import Cartpage from "./cartpage";

function CartIcon({ cart }) {

  return (
    <div className="cart-icon">
      <Cartpage />
    </div>
  );
}

export default CartIcon;