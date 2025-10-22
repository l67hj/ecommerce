import React, { useEffect } from "react";
import Swal from "sweetalert2";

function ReceiptPage() {
  const receipt = JSON.parse(localStorage.getItem("receipt"));

  useEffect(() => {
    if (receipt) {
      Swal.fire({
        title: "Payment Successful!",
        text: `Transaction ID: ${receipt.transactionId}`,
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }, []);

  if (!receipt) {
    return <p>No receipt found. Please complete checkout first.</p>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
   <>
    <div className="receipt-container">
      <h2>Payment Receipt</h2>
      <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
      <p><strong>Date:</strong> {receipt.date}</p>

      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {receipt.user.firstName} {receipt.user.lastName}</p>

      <p><strong>Email:</strong> {receipt.user.email}</p>
      <p>
        <strong>Address:</strong> {receipt.user.address}, {receipt.user.city},{" "}
        {receipt.user.country}
      </p>

      <h3>Purchased Items</h3>
    
        {receipt.cart.map((item) => (
          <div key={item.id}>
           <p>{item.title}</p>  - {item.quantity} - <span>${item.price * item.quantity}</span>
          </div>
        ))}
    

      <h3>Total Paid: <span>${receipt.total.toFixed(2)}</span></h3>

      <button className="print-btn" onClick={handlePrint}>
        🖨️ Print Receipt
      </button>
    </div>
   </>
  );
}

export default ReceiptPage;