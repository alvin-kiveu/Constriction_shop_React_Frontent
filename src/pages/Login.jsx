import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = ({ onLogin }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
          onSubmit={(values, { setSubmitting }) => {
            // Perform login logic (e.g., API call)
            // Call onLogin callback with the login data
            onLogin(values);
            setSubmitting(false);
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

              <button type="submit" style={{ backgroundColor: '#e8ae5c', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }} disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;



