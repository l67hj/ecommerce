import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";


function Cartpage({ cart, increaseQty, decreaseQty, handleDelete, total, setCart }) {
  const navigate = useNavigate();

  function addToCart(item) {
  const outOfStock = JSON.parse(localStorage.getItem("outOfStock")) || [];

  if (outOfStock.includes(item.id)) {
    Swal.fire("Sorry!", "This product is out of stock.", "warning");
    return;
  }
}


  return (
    <>
    <div className="cart-container">
      <div className="your-cart">
       <h2>Your Cart</h2>
       <Link to="/" className="continue">Continue Shoping</Link>
      </div>
     <div className="sub-heading">
      <h4>Product</h4>
      <h4>Quantity</h4>
      <h4>Total</h4>
     
     </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="sub-cart">
              <img src={item.image} alt={item.title} />
              
                <div className="price">
                  <h4>{item.title}</h4>
                <p>${item.price}</p>
                </div>
                </div>
              
                <div className="quantity-controls">
                  <div className="controleers">
                    
                     <button className="cart-one" onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button  className="cart-one" onClick={() => increaseQty(item)}>+</button>
                  </div>
               <button onClick={() => handleDelete(item)}><RiDeleteBin6Line /> </button>
                </div>
                <div className="item">
                  <p>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                </div>
             
            </div>
          ))}
          <div className="total-box">
          <h3>Estimated Total :<span>${total.toFixed(2)}</span> </h3>
        
            <p>Texas, discount and shipping calculated at checkout</p>
           
          
            <button
            disabled={cart.length === 0}
          onClick={() => {
           if (cart.length > 0) navigate("/checkoutpage"); 
           }}
            className="checkout-btn"> Checkout</button>
</div>
        </div>
      )}
    </div>
    </>
    
  );
}

export default Cartpage;