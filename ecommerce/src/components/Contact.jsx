import React, { useState } from "react";
import Swal from "sweetalert2";


function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Message Sent!",
      text: `Thank you ${formData.name}, we will get back to you soon.`,
      icon: "success",
      confirmButtonColor: "#8B3B05",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
    <div className="contact">
      <h1>Contact Us</h1>
      </div>
      <div className="contact-box">
      <div className="contact-info">
        <h2>Email</h2>
        <h3> abdulganiurukayat0808@gmail.com</h3>
        <h2>Phone</h2>
        <span> +234 8130658164</span>
        <h2>Address</h2>
        <p> Akobo Calton Gate, Ibadan, Nigeria</p>
      </div>

      <div  className="contact-context">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      </div>
      </div>  

    </>
    
  );
}

export default Contact;