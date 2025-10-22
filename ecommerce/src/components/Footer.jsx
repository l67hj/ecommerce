import { Link } from 'react-router-dom'
import { useState } from 'react'

function Footer() {
const [email, setEmail] = useState("")
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email.includes('@')) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }
  console.log('Subscribed with:', email);
  setSuccessMessage('Thank you for subscribing!👍');
  setEmail("")
  setTimeout(() => {
    setSuccessMessage("");
  }, 500);
};

  
  return (
    <>
    <div className='footer'>
      <h4>KR BAKO</h4>
      <span>Your one-stop shop for quality products at the best prices.</span>
      <div className='footer-item'>
        <div className='footer-stuff'>
        <h3>QUICK LINKS</h3>
         <Link to="/" className='footer-link'>Home</Link>
         <Link to="/product" className='footer-link'>Product</Link>
        <Link to="/about" className='footer-link'>About Us</Link>
        <Link to="/contact" className='footer-link'>Contact us</Link>
         <Link to="/searchicon" className='footer-link'>Search</Link>
          <Link to="/carticon" className='footer-link'>Cart</Link>
           
           </div>
           <div className='footer-stuff'>
            <h3>CUSTOMER SERVICE</h3>
            <p>Shipping Policy</p>
            <p>Return Policy</p>
            <p>Track Orders</p>
            <p>Terms & Conditions</p>
           </div>

           <div className='footer-stuff'>
            <h3>STAY CONNECTED</h3>
            <form onSubmit={handleSubmit} className='form-one'>
              <div className='message'>
                {successMessage && <p> {successMessage}</p>}
              {errorMessage && <p classNameName="message-error">{errorMessage}</p>}
              </div>
               
              <input type="email" placeholder="Enter your email" 
               value={email}
                onChange={(e) => {
    setEmail(e.target.value)
    setMessage("")
  }}
  
  />
  
              <button type="submit">Subscribe</button>
             

            </form>
            <div className='social'>
              <img src="/Facebook.svg"/>
    <img src="/Instagram.svg"/>
    <img src="/X.svg"/>
    <img src="/LinkedIn.svg"/>
              
            </div>
           </div>
      </div>
      <div className="final">
              <i className="fa-regular fa-copyright"></i>
              <p>2025 KRbako. All Rights Reserved</p>
      </div>

    </div>
    </>
  )
}

export default Footer