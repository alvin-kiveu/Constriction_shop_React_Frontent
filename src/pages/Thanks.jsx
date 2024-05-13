import React from 'react';

const ThankYouPage = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h2 className="text-success mb-4"><i className="fas fa-check-circle mr-2"></i>PAYMENT IS SUCCESSFULLY</h2>
                    <div className="bg-light p-5 rounded shadow">
                        <h2 className="mb-4">Thank You for Your Payment!</h2>
                        <p className="lead">Your payment was successful. We appreciate your business!</p>
                        <p>You will receive a confirmation email shortly.</p>
                        {/* You can add more content or styling here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
