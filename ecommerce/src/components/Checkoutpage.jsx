import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CheckoutPage({ cart, total, setCart }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
  .matches(/^\d{10,15}$/, "Enter a valid phone number")
  .required("Phone number is required"),
   cardNumber: Yup.string()
  .matches(/^\d{16}$/, "Card number must be 16 digits")
  .required("Card number is required"),

  address: Yup.string().required("Address is required"),
  paymentMethod: Yup.string().required("Please select a payment method"),
});

  const formik = useFormik({
  
 initialValues: {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  cardNumber: "",
  address: "",
  paymentMethod: "",
},

    
    validationSchema,
    onSubmit: (values) => {
  Swal.fire({
    title: "Processing Payment...",
    text: "Please wait a moment",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  setTimeout(() => {
    const receiptData = {
      transactionId: "TX-" + Math.floor(Math.random() * 1000000000),
      date: new Date().toLocaleString(),
      user: values,
      cart: cart,
      total: total,
    };

    
    localStorage.setItem("receipt", JSON.stringify(receiptData));

    Swal.fire({
      title: "Payment Successful!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "View Receipt",
      confirmButtonColor: "#8C5631",
    }).then(() => {
       const outOfStock = JSON.parse(localStorage.getItem("outOfStock")) || [];
       cart.forEach((item) => {
    if (!outOfStock.includes(item.id)) {
      outOfStock.push(item.id);
    }
  });

  
  localStorage.setItem("outOfStock", JSON.stringify(outOfStock));
      setCart([]);
      navigate("/receipt"); 
    });
  }, 1500);
},

  });

  return (
    <>
    <div className="checkout-page">
      
       <div className="checkout">
      {/* <div>

      </div> */}
      
      <form onSubmit={formik.handleSubmit} className="checkout-form">
        <h2>Checkout Page</h2>
        <div className="name-lebel">
          <div className="name-form">
           <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          placeholder="Enter your first name"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
          </div>
         
          <div className="name-form">
           <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          placeholder="Enter your last name"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}

          </div>
       
        </div>
        
          <div className="address">
          <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
        <label>Phone Number</label>
        <input
        type="text"
         name="phone"
         onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      value={formik.values.phone}
      placeholder="Enter your phone number"
        />
{formik.touched.phone && formik.errors.phone ? (
  <div className="error">{formik.errors.phone}</div>
) : null}

        
        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          placeholder="Enter your address"
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="error">{formik.errors.address}</div>
        ) : null}

        
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.paymentMethod}
        >
          <option value="">Select a payment method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
          <div className="error">{formik.errors.paymentMethod}</div>

        ) : null}
        

     <label>Card Number</label>
    <input
     type="text"
     name="cardNumber"
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    value={formik.values.cardNumber}
    placeholder="Enter your 16-digit card number"
/>
{formik.touched.cardNumber && formik.errors.cardNumber ? (
  <div className="error">{formik.errors.cardNumber}</div>
) : null}


          <div className="confirm-btn">
           <button type="submit" >
           Pay Now
        </button>
          </div>
          </div>
        
        

  </form>
        <div className="summary">
          <h3>Order Summary</h3>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="summary-item">
              <h2>Product Name:  <span>{item.title}</span></h2>
                <h2>Number of Product Purchased:  <span>{item.quantity}</span></h2> 
               <p>Subtotal:  <span>${(item.price * item.quantity).toFixed(2)}</span></p> 
              
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <h4>Estimated Total:  <span>${total.toFixed(2)}</span> </h4>

        </div>
       
      
    </div>
    </div>
     
    </>
    
  );
}

export default CheckoutPage;
