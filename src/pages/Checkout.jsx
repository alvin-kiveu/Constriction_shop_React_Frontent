import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../config';
import MpesaLogo from '../comps/logos/mpesa-logo.png';
import { useNavigate } from 'react-router-dom';
import StripeLogo from '../comps/logos/stripe-logo.png';

const Checkout = ({ cartItems, setCartItems, isAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: '', // Added paymentMethod field
  });

  //STRIPE PAYMENT
  const handleStripePayment = async () => {
    try {
      console.log("Initiating checkout...");
      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to initiate checkout. Server returned " + response.status + " " + response.statusText);
      }
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      const { checkout_session_url } = data;
  
      if (!checkout_session_url) {
        throw new Error("Invalid response from server: checkout_session_url not found");
      }
  
      // Redirect to Stripe checkout using the checkout_session_url
      console.log("Redirecting to Stripe checkout:", checkout_session_url);
      window.location.href = checkout_session_url;
    } catch (error) {
      console.error("Error in handleStripePayment:", error.message);
      toast.error("Failed to initiate checkout. Please try again later.");
    }
  };
  

  const handleMpesaPayment = async () => {
    try {
      console.log("Initiating Mpesa payment...");
  
      // Get relevant data for Mpesa payment
      const { name, phone } = formData;
      const amount = parseInt(cartItems.reduce((total, item) => total + item.price, 0));

  
      console.log("Mpesa payment data:", { name, phone, amount });
  
      const mpesaUrl = `${API_URL}/api/mpesa/initiate-stk-push?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&amount=${amount}`;
      console.log("Mpesa URL:", mpesaUrl);
  
      const response = await fetch(mpesaUrl);
  
      if (!response.ok) {
        throw new Error("Failed to initiate Mpesa payment. Server returned " + response.status + " " + response.statusText);
      }
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      //CHECK ID success is true and it is there
      if (!data.success || !data.data) {
        throw new Error("Invalid response from server: success or data not found");
      }

      const Result = data.data.success;
      //CHEVCK IF ITS AVALIABLE ON THE RESPONSE
      if (Result) {
         // Clear the cart items
        //  setCartItems([]);
         const successMessage = "Mpesa Stk push has been initiated successfully. Please check your phone " + phone + " for the prompt to complete the payment.";
         toast.success(successMessage);
         // Extract the transaction request ID from the response
         const transaction_request_id = data.data.tranasaction_request_id;
         console.log("Transaction request ID:", transaction_request_id);
         // Call the function to verify the payment status with the transaction request ID
         verifyPaymentStatus(transaction_request_id);
      }else{
        const errorMessage = data.data.errorMessage;
        toast.error(errorMessage);
      }

    } catch (error) {
      console.error("Error in handleMpesaPayment:", error.message);
      toast.error("Failed to initiate Mpesa payment. Please try again later.");
    }
  };
  
  

  //PHONE NUMBER VALIDATION ALLOW 2547 OR 07 OR 01 FOLLOWED BY 8 DIGITS
  const phoneValidation = (phone) => {
    const phoneRegex = /^(?:254|\+254|0)?(7\d{8})$/;
    return phoneRegex.test(phone);
  }

  const verifyPaymentStatus = async (transaction_request_id) => {
    try {
        const verifyUrl = `${API_URL}/api/mpesa/verify_payment_status?transaction_request_id=${transaction_request_id}`;

        const response = await fetch(verifyUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Failed to verify payment status. Server returned " + response.status + " " + response.statusText);
        }

        const data = await response.json();
        console.log("Payment verfy Response from server:", data);
        const TransactionStatus = data.data.TransactionStatus;
        if (TransactionStatus === 'Completed') {
            // Payment is successful
            console.log("Payment is successful");
            toast.success("Payment is successful");
            // Clear the cart items
            setCartItems([]);
            // Redirect to the home page
            navigate('/');
        } else if(TransactionStatus === 'Failed'){
            // Payment failed
            console.log("Payment failed");
            toast.error("Payment failed");
        }else if(TransactionStatus === 'Cancelled'){
            // Payment was cancelled
            console.log("Payment was cancelled");
            toast.info("Payment was cancelled");
        }else{
            // Payment is still pending
            console.log("Payment is still pending");
            toast.info("Verifying payment status... please wait");
            //THE CALL THE FUNCTION AGAIN AFTER 2 SECONDS
            setTimeout(() => {
                verifyPaymentStatus(transaction_request_id);
            }, 2000);
        }

    } catch (error) {
        console.error("Error in verifyPaymentStatus:", error.message);
        // Display error message or handle other cases
    }
};



  //VALIDATE EMAIL
  const emailValidation = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  

  const notifyError = (errorsmessage) => {
    toast.error(errorsmessage, {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: '#dcae6e',
        color: '#fff',
        padding: '10px',
      },
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const errors = {};
    //GET ALL THE FORM DATE
    const { name, phone, email, paymentMethod } = formData;
    //CHECK IF THE FORM IS FILLED
    if (!name || !phone || !email || !paymentMethod) {
      errors.message = 'All fields are required';
      notifyError(errors.message);
    }
    //VALIDATE PHONE NUMBER
    if (!phoneValidation(phone)) {
      errors.message = 'Invalid phone number user 2547 or 07 or 01 followed by 8 digits';
      notifyError(errors.message);
    }

    //VALIDATE EMAIL
    if (!emailValidation(email)) {
      errors.message = 'Invalid email address';
      notifyError(errors.message);
    }

    //CHECK IF ACCOUNT IS CART IS EMPTY RETURN ERROR AND REDIREDT TO CART
    if (cartItems.length === 0) {
      errors.message = 'Your cart is empty';
      notifyError(errors.message);
      navigate('/');
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    //CHECK PAYMENT METHOD
    if (paymentMethod === 'mpesa') {
      //IMPLEMENT MPESA PAYMENT
      handleMpesaPayment();
    } else if (paymentMethod === 'stripe') {
      //IMPLEMENT STRIPE PAYMENT
      handleStripePayment();
    }

    
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>
      <form className='row' style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row' }} onSubmit={handleCompleteOrder}> {/* Changed this.handleCompleteOrder to handleCompleteOrder */}
       <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" />

        <div className="col-md-12">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange}  placeholder='eg John Doe' required />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder='eg 0712345678' required />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='eg example@gmail.com' required />
        </div>
        <div className="col-md-12">
          <label className="form-label" style={{ marginTop: '12px', fontWeight: '600' }}>Payment Method</label>
         
        </div>
        <div className="col-md-12 row d-flex flex-row"> {/* Changed flex-column to flex-row */}
          <div  className="col-md-2 form-check d-flex flex-row" style={{ marginTop: '20px', borderRadius: '5px', border: '1px solid green',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', padding: '2px',  marginRight: '20px' }}> {/* Added marginRight for spacing between payment methods */}
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              id="paymentMethod1" 
              value="mpesa" 
              onChange={handleChange} 
              required
              style={{
                border: '1px solid red',
                marginLeft: '16px',
                marginTop: '18px', 
              }}
            />
            <label 
              className="form-check-label payment-option" 
              htmlFor="paymentMethod1" 
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '10px', 
                backgroundColor: '#fff', 
                padding: '10px', 
                borderRadius: '5px', 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
                marginRight: '16px', // Added to create space between input and label
              }}
            >
              <img 
                className="payment-logo" 
                src={MpesaLogo} 
                alt="Mpesa" 
                style={{ marginRight: '10px', width: '50px' }} 
              />
            </label>
          </div>
          <div className="col-md-2 form-check d-flex flex-row" style={{ marginTop: '20px', display: 'none', borderRadius: '5px', border: '1px solid blue',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', padding: '2px',  marginRight: '20px' }}> {/* Added d-flex flex-row */}
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              id="paymentMethod2" 
              value="stripe" 
              onChange={handleChange} 
              required
              style={{
                border: '1px solid red',
                marginLeft: '16px',
                marginTop: '18px', 
              }}
            />
            <label 
              className="form-check-label payment-option" 
              htmlFor="paymentMethod2" 
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '10px',  
                padding: '10px', 
                borderRadius: '5px', 
                marginRight: '10px', // Added to create space between input and label
              }}
            >
              <img 
                className="payment-logo" 
                src={StripeLogo} 
                alt="Stripe" 
                style={{  marginRight: '16px', width: '50px' }} 
              />
            </label>
          </div>  
       </div>


       <div className="col-md-12" style={{ marginTop: '20px' }}>

        <button type="submit" className="btn btn-success" >Complete Order</button>
      </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
