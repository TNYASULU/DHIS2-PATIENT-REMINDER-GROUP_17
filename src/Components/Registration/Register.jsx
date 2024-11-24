import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./api";
import "./Register.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";

// DHIS2 query to fetch organization units
const orgUnitQuery = {
  organisationUnits: {
    resource: "organisationUnits.json",
    // Endpoint to fetch org units
    params: {
      level: 2,
      // Fetch organization units at level 2
      fields: "id,name",
      // Retrieve ID and name fields
      paging: false // Fetch all units without pagination
    }
  }
};
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    location: "",
    orgUnit: ""
  });
  const [orgUnits, setOrgUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const {
    loading: orgLoading,
    error,
    data
  } = useDataQuery(orgUnitQuery);
  useEffect(() => {
    if (data && Array.isArray(data.organisationUnits.organisationUnits)) {
      setOrgUnits(data.organisationUnits.organisationUnits); // Save fetched organization units
    }
  }, [data]);
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerPatient(formData); // API call to register patient
      if (response.status === "OK") {
        setEnrollmentSuccess(true);
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Error registering patient");
    } finally {
      setLoading(false);
    }
  };
  if (orgLoading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "loader"
    }, /*#__PURE__*/React.createElement(CircularLoader, null), " ", /*#__PURE__*/React.createElement("p", null, "Loading organization units, please wait..."));
  }
  if (error) return /*#__PURE__*/React.createElement("div", null, "Error fetching organization units");
  return /*#__PURE__*/React.createElement("div", {
    className: "register-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Register Patient"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstName",
    placeholder: "First Name",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "lastName",
    placeholder: "Last Name",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dob",
    placeholder: "Date of Birth",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("select", {
    name: "gender",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Gender"), /*#__PURE__*/React.createElement("option", {
    value: "Male"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    value: "Female"
  }, "Female"), /*#__PURE__*/React.createElement("option", {
    value: "Other"
  }, "Other")), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    name: "phone",
    placeholder: "Phone Number",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "location",
    placeholder: "Location",
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("select", {
    name: "orgUnit",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Organization Unit"), orgUnits.map(unit => /*#__PURE__*/React.createElement("option", {
    key: unit.id,
    value: unit.id
  }, unit.name))), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: loading,
    loading: loading
  }, loading ? "Registering..." : "Register"), /*#__PURE__*/React.createElement(Button, {
    type: "reset",
    secondary: true
  }, "Cancel"), enrollmentSuccess && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Success",
    success: true
  }, "Patient Registered Successfully!")));
};
export default Register;
