import React, { useState } from 'react';
import { NoticeBox, Button } from '@dhis2/ui';
import OrganizationUnitDropdown from './OrganizationUnitDropdown'; 
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    organizationUnit: '',
  });

  const [showNotice, setShowNotice] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Data:', formData);
    alert('Registration Successful!');
  };

  return (
    <div className="registration-container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="form-group">
          <label>Sex:</label>
         <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
          <option value="">Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
         </select>
      </div>
      <div className="form-group">
          <label>Organization Unit:</label>
          <OrganizationUnitDropdown
            value={formData.organizationUnit}
            onChange={handleChange}
          />
        </div>
        <Button primary type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Registration;