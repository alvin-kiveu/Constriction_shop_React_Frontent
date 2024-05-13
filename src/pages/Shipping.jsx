import React, { useState } from 'react';
import axios from 'axios';

const ShippingDetails = () => {
  const [shippingMethod, setShippingMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCost, setShippingCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculateShippingCost = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/shipping/calculate', {
        method: shippingMethod,
        address: shippingAddress,
      });
      setShippingCost(response.data.cost);
      setError(null);
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      setError('Error calculating shipping cost');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Shipping Details</h2>
      <div>
        <label htmlFor="shippingMethod">Shipping Method:</label>
        <select
          id="shippingMethod"
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
        >
          <option value="">Select Method</option>
          <option value="standard">Standard Shipping</option>
          <option value="express">Express Shipping</option>
        </select>
      </div>
      <div>
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input
          type="text"
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>
      <button onClick={handleCalculateShippingCost} disabled={!shippingMethod || !shippingAddress || loading}>
        {loading ? 'Calculating...' : 'Calculate Shipping Cost'}
      </button>
      {error && <div>{error}</div>}
      {shippingCost && (
        <div>
          <h3>Shipping Cost:</h3>
          <p>{shippingCost}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingDetails;
