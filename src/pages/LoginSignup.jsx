import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleLoginLinkClick = () => {
    setRedirectToLogin(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#e8ae5c', textAlign: 'center' }}>Signup</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
          }}
          validate={(values) => {
            const errors = {};

            // Name validation
            if (!values.name) {
              errors.name = 'Required';
            }

            // Email validation
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }

            // Password validation
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 6) {
              errors.password = 'Password must be at least 6 characters';
            }

            // Confirm Password validation
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = 'Passwords must match';
            }

            // Terms and Conditions validation
            if (!values.agreeToTerms) {
              errors.agreeToTerms = 'You must agree to the terms and conditions';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Name</label>
                <Field type="text" name="name" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} onBlur={handleBlur} />
                <ErrorMessage name="name" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
                <Field type="email" name="email" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} onBlur={handleBlur} />
                <ErrorMessage name="email" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
                <Field type="password" name="password" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} onBlur={handleBlur} />
                <ErrorMessage name="password" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="confirmPassword" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Confirm Password</label>
                <Field type="password" name="confirmPassword" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} onBlur={handleBlur} />
                <ErrorMessage name="confirmPassword" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Field type="checkbox" name="agreeToTerms" className="form-check-input" style={{ marginRight: '8px' }} />
                <label htmlFor="agreeToTerms" className="form-check-label" style={{ fontWeight: 'bold' }}>
                  By continuing, you agree to the terms and conditions
                </label>
                <ErrorMessage name="agreeToTerms" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#e8ae5c', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }} disabled={isSubmitting}>
                Submit
              </button>

              <p className="mt-3">
                    Already have an account?{' '}
                    <span onClick={handleLoginLinkClick} style={{ cursor: 'pointer', color: 'blue' }}>Click here to login</span>
                  </p>

                  {redirectToLogin && <Navigate to="/signup" />}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginSignup;





