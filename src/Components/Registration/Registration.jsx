import React, { useState } from 'react';
// Uncomment and import useDataQuery if you intend to use it
// import { useDataQuery } from '@dhis2/app-runtime';
import './Registration.css'; // Ensure the CSS file is in the correct location

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    organizationUnit: '',
    program: '',
  });

  // Define organization units and programs
  const organizationUnits = ['Unit 1', 'Unit 2', 'Unit 3'];
  const programs = ['Program A', 'Program B', 'Program C'];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Data:', formData);
    alert('Registration Successful!');
  };