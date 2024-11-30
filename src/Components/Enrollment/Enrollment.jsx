import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime"; // Import the DHIS2 app runtime
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";
import "./Enrollment.css"; // Import the custom CSS

// Define DHIS2 queries for organization units, programs, and patients
const orgUnitsQuery = {
  organisationUnits: {
    resource: 'organisationUnits',
    params: {
      fields: 'id,name', // Fetch id and name of organization units
    },
  },
};

const programsQuery = {
  programs: {
    resource: 'programs',
    params: {
      fields: 'id,displayName', // Fetch id and displayName of programs
    },
  },
};

const patientsQuery = {
  trackedEntityInstances: {
    resource: 'trackedEntityInstances',
    params: {
      fields: 'id,displayName', // Fetch id and displayName of patients
    },
  },
};

const Enroll = () => {
  // State for form data and selected options
  const [formData, setFormData] = useState({
    orgUnit: '',
    programId: '',
    patientId: '',
    enrollmentDate: '',
  });
  const [error, setError] = useState('');

  // Fetch data using useDataQuery
  const { data: orgUnitsData, loading: orgUnitsLoading, error: orgUnitsError } = useDataQuery(orgUnitsQuery);
  const { data: programsData, loading: programsLoading, error: programsError } = useDataQuery(programsQuery);
  const { data: patientsData, loading: patientsLoading, error: patientsError } = useDataQuery(patientsQuery);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for enrolling the patient
  const handleEnrollPatient = async (event) => {
    event.preventDefault();

    try {
      const enrollmentDetails = {
        program: formData.programId,
        trackedEntityInstance: formData.patientId, // Unique patient ID
        orgUnit: formData.orgUnit, // Selected organization unit
        enrollmentDate: formData.enrollmentDate, // Enrollment date
      };

      // Replace this with your actual API call for enrollment
      // Example: await registerPatient(enrollmentDetails);

      console.log("Patient enrolled successfully.");
    } catch (error) {
      setError("Error enrolling patient");
      console.error(error);
    }
  };

  // Check for loading states and render UI accordingly
  if (orgUnitsLoading || programsLoading || patientsLoading) {
    return (
      <div className="loader-container">
        <CircularLoader />
      </div>
    );
  }

  // Error handling
  if (orgUnitsError || programsError || patientsError) {
    return (
      <NoticeBox title="Error" error>
        Something went wrong while fetching data.
      </NoticeBox>
    );
  }

  return (
    <div className="enroll-form">
      <h1>Enroll Patient</h1>
      <form onSubmit={handleEnrollPatient}>
        {/* Select Organization Unit */}
        <div className="form-group">
          <label htmlFor="orgUnit">Select Organization Unit</label>
          <select
            id="orgUnit"
            name="orgUnit"
            value={formData.orgUnit}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Organization Unit</option>
            {orgUnitsData.organisationUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Program */}
        <div className="form-group">
          <label htmlFor="programId">Select Program</label>
          <select
            id="programId"
            name="programId"
            value={formData.programId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Program</option>
            {programsData.programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Patient */}
        <div className="form-group">
          <label htmlFor="patientId">Select Patient</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Patient</option>
            {patientsData.trackedEntityInstances.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Enrollment Date */}
        <div className="form-group">
          <label htmlFor="enrollmentDate">Select Enrollment Date</label>
          <input
            type="date"
            id="enrollmentDate"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" primary>
          Enroll Patient
        </Button>
      </form>

      {error && <NoticeBox title="Error" error>{error}</NoticeBox>}
    </div>
  );
};

export default Enroll;
