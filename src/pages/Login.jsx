import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, isAuthenticated }) => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/signup'); 
  };

  const notifySuccess = () => {
    toast.success('Login successful!', {
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

  if (isAuthenticated) {
    navigate('/checkout');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer bodyClassName="custom-toast-body" />
      <div style={{ width: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#e8ae5c', textAlign: 'center' }}>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};

            // Email validation
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }

            // Password validation
            if (!values.password) {
              errors.password = 'Required';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('http://127.0.0.1:8000/api/login', values);
              const token = response.data.jwt;
              notifySuccess();
              onLogin(values);
              localStorage.setItem('token', token)
             
              
            } catch (error) {
              console.error('Login failed:', error);
              setLoginError(error.response?.data?.detail || 'An error occurred during login.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
                <Field type="email" name="email" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                <ErrorMessage name="email" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
                <Field type="password" name="password" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                <ErrorMessage name="password" component="div" style={{ color: '#dc3545', marginTop: '5px' }} />
              </div>
              {loginError && <div style={{ color: '#dc3545', marginTop: '5px' }}>{loginError}</div>}
              <button type="submit" style={{ backgroundColor: '#e8ae5c', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }} disabled={isSubmitting}>
                Login
              </button>

              <p className="mt-3">
                Don't have an account?{' '}
                <span onClick={handleRegisterClick} style={{ cursor: 'pointer', color: '#E8AE5C' }}>
                  Click here to sign up
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;







