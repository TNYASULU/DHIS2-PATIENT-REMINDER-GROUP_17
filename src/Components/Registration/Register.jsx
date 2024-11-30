import React, { useState, useEffect, useCallback } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./api";
import "./Register.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";


const orgUnitQuery = {
  organisationUnits: {
    resource: "organisationUnits.json",
    params: {
      level: 2,
      fields: "id,name",
      paging: false,
    },
  },
};

const Register = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    location: "",
    orgUnit: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [orgUnits, setOrgUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  const { loading: orgLoading, error, data } = useDataQuery(orgUnitQuery);

  // Using useCallback to prevent recreation of functions
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await registerPatient(formData);
        if (response.status === "OK") {
          setEnrollmentSuccess(true);
          setFormData(initialFormState); // Reseting  form on success!
        }
      } catch (error) {
        console.error("Error registering patient:", error);
        alert("Error registering patient");
      } finally {
        setLoading(false);
      }
    },
    [formData, initialFormState]
  );

  useEffect(() => {
    if (data?.organisationUnits?.organisationUnits) {
      setOrgUnits(data.organisationUnits.organisationUnits);
    }
  }, [data]);

  // Render Loader
  if (orgLoading) {
    return (
      <div className="loader">
        <CircularLoader />
        <p>Loading organization units, please wait...</p>
      </div>
    );
  }

  // Render Error
  if (error) {
    return <div>Error fetching organization units</div>;
  }

  // Render Form
  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
          required
        />
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          value={formData.dob}
          required
        />
        <select
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={formData.location}
        />
        <select
          name="orgUnit"
          onChange={handleChange}
          value={formData.orgUnit}
          required
        >
          <option value="">Select Organization Unit</option>
          {orgUnits.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <Button type="reset" secondary onClick={() => setFormData(initialFormState)}>
          Cancel
        </Button>
        {enrollmentSuccess && (
          <NoticeBox title="Success" success>
            Patient Registered Successfully!!
          </NoticeBox>
        )}
      </form>
    </div>
  );
};

export default Register;
