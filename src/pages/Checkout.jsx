import { useEffect } from "react";
import { API_URL } from "../config/index";

const Checkout = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const buttonStyle = {
    backgroundColor: '#e8ae5c',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <img
              src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-Powered-by-Stripe-Logo.wine.svg"
              alt="Stripe"
              className="card-img-top"
            />
            <div className="card-body d-flex flex-column justify-content-center align-items-center" >
              <h3 className="card-title" style={{ color: "#32364E" }}>Click make payment button to proceed</h3>
              <form action={`${API_URL}/api/stripe/create-checkout-session`} method="POST">
                <button type="submit" className="btn btn-primary" style={buttonStyle}>Make payment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
