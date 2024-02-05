import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);
  


  const handleLoginLinkClick = () => {
    navigate('/signup');
  };

  const notifySuccess = async () => {

     toast.success('Registration successful!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
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
          onSubmit={async(values, { setSubmitting }) => {
            try{
              const response = await axios.post('http://127.0.0.1:8000/api/register', values);
              await notifySuccess()
              navigate('/signup');
              alert('Registration successful')
              console.log('Registration successful:', response.data);
              
            } catch(error){
              console.error('Registration failed:', error.response);
              setRegistrationError(error.response.data.detail);
            }finally{
              setSubmitting(false);
            }
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
              {registrationError && <div style={{ color: '#dc3545', marginTop: '5px' }}>{registrationError}</div>}

              <button 
              type="submit" 
              style={{ backgroundColor: '#e8ae5c', 
              color: '#fff', 
              padding: '12px', 
              fontSize: '18px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              width: '100%' }} 
              disabled={isSubmitting}
              >
                Submit
              </button>

              <p className="mt-3">
                    Already have an account?{' '}
                    <span onClick={handleLoginLinkClick} style={{ cursor: 'pointer', color: '#E8AE5C' }}>Click here to login</span>
                  </p>

               
            </form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginSignup;





