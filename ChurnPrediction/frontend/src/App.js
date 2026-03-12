import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    gender: '0',
    SeniorCitizen: '0',
    Partner: '0',
    Dependents: '0',
    tenure: '',
    PhoneService: '0',
    MultipleLines: '0',
    InternetService: '0',
    OnlineSecurity: '0',
    OnlineBackup: '0',
    DeviceProtection: '0',
    TechSupport: '0',
    StreamingTV: '0',
    StreamingMovies: '0',
    Contract: '0',
    PaperlessBilling: '0',
    PaymentMethod: '0',
    MonthlyCharges: '',
    TotalCharges: ''
  });
  const [probability, setProbability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProbability(null);

    try {
      const numericData = {
        gender: parseInt(formData.gender),
        SeniorCitizen: parseInt(formData.SeniorCitizen),
        Partner: parseInt(formData.Partner),
        Dependents: parseInt(formData.Dependents),
        tenure: parseInt(formData.tenure),
        PhoneService: parseInt(formData.PhoneService),
        MultipleLines: parseInt(formData.MultipleLines),
        InternetService: parseInt(formData.InternetService),
        OnlineSecurity: parseInt(formData.OnlineSecurity),
        OnlineBackup: parseInt(formData.OnlineBackup),
        DeviceProtection: parseInt(formData.DeviceProtection),
        TechSupport: parseInt(formData.TechSupport),
        StreamingTV: parseInt(formData.StreamingTV),
        StreamingMovies: parseInt(formData.StreamingMovies),
        Contract: parseInt(formData.Contract),
        PaperlessBilling: parseInt(formData.PaperlessBilling),
        PaymentMethod: parseInt(formData.PaymentMethod),
        MonthlyCharges: parseFloat(formData.MonthlyCharges),
        TotalCharges: parseFloat(formData.TotalCharges)
      };

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(numericData)
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setProbability(data.churn_probability);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔮 Churn Prediction Model</h1>
        <p>Enter customer details to predict churn probability</p>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender: </label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tenure">Tenure (months): </label>
              <input type="number" id="tenure" name="tenure" placeholder="0-72" value={formData.tenure} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="SeniorCitizen">Senior Citizen: </label>
              <select id="SeniorCitizen" name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Partner">Has Partner: </label>
              <select id="Partner" name="Partner" value={formData.Partner} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Dependents">Has Dependents: </label>
              <select id="Dependents" name="Dependents" value={formData.Dependents} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="PhoneService">Phone Service: </label>
              <select id="PhoneService" name="PhoneService" value={formData.PhoneService} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="MultipleLines">Multiple Lines: </label>
              <select id="MultipleLines" name="MultipleLines" value={formData.MultipleLines} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="InternetService">Internet Service: </label>
              <select id="InternetService" name="InternetService" value={formData.InternetService} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">DSL</option>
                <option value="2">Fiber Optic</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="OnlineSecurity">Online Security: </label>
              <select id="OnlineSecurity" name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="OnlineBackup">Online Backup: </label>
              <select id="OnlineBackup" name="OnlineBackup" value={formData.OnlineBackup} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="DeviceProtection">Device Protection: </label>
              <select id="DeviceProtection" name="DeviceProtection" value={formData.DeviceProtection} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="TechSupport">Tech Support: </label>
              <select id="TechSupport" name="TechSupport" value={formData.TechSupport} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="StreamingTV">Streaming TV: </label>
              <select id="StreamingTV" name="StreamingTV" value={formData.StreamingTV} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="StreamingMovies">Streaming Movies: </label>
              <select id="StreamingMovies" name="StreamingMovies" value={formData.StreamingMovies} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Contract">Contract Type: </label>
              <select id="Contract" name="Contract" value={formData.Contract} onChange={handleInputChange}>
                <option value="0">Month-to-Month</option>
                <option value="1">One Year</option>
                <option value="2">Two Year</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="PaperlessBilling">Paperless Billing: </label>
              <select id="PaperlessBilling" name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleInputChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="PaymentMethod">Payment Method: </label>
              <select id="PaymentMethod" name="PaymentMethod" value={formData.PaymentMethod} onChange={handleInputChange}>
                <option value="0">Electronic Check</option>
                <option value="1">Mailed Check</option>
                <option value="2">Bank Transfer</option>
                <option value="3">Credit Card</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="MonthlyCharges">Monthly Charges ($): </label>
              <input type="number" id="MonthlyCharges" name="MonthlyCharges" placeholder="0.00" value={formData.MonthlyCharges} onChange={handleInputChange} step="0.01" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-full">
              <label htmlFor="TotalCharges">Total Charges ($): </label>
              <input type="number" id="TotalCharges" name="TotalCharges" placeholder="0.00" value={formData.TotalCharges} onChange={handleInputChange} step="0.01" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? '⏳ Predicting...' : '🔮 Predict Churn'}
          </button>
        </form>

        {error && <div className="error-message">❌ Error: {error}</div>}

        {probability !== null && (
          <div className="result-container">
            <h2>Churn Probability: {(probability * 100).toFixed(2)}%</h2>
            <p className="probability-value">Raw Value: {probability.toFixed(4)}</p>
            {probability > 0.5 ? (
              <p className="high-risk">⚠️ HIGH RISK - Consider retention strategies immediately</p>
            ) : (
              <p className="low-risk">✓ LOW RISK - Customer is likely to stay</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
