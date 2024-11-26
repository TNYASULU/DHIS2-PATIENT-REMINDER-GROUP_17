import React, { useState, useEffect } from 'react';
//import { authenticateAndGetAccessToken, scheduleReminder } from '../api/Dhis2Api'; // Adjust import paths

const Enroll = () => {
  // State for form data and fetched options
  const [formData, setFormData] = useState({
    orgUnit: '',
    programId: '',
    patientId: '',
    enrollmentDate: ''
  });
  const [orgUnits, setOrgUnits] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch Organization Units from DHIS2
  useEffect(() => {
    const fetchOrgUnits = async () => {
      setLoading(true);
      try {
        //const accessToken = await authenticateAndGetAccessToken();
        const response = await fetch('https://data.research.dhis2.org/api/organisationUnits.json', {
          headers: {
            Authorization: "Basic " + btoa('admin:district'),
          },
        });
        const data = await response.json();
        setOrgUnits(data.organisationUnits); 
      } catch (error) {
        setError('Failed to load organization units');
      } finally {
        setLoading(false);
      }
    };

    fetchOrgUnits();
  }, []);

  // Fetch Programs from DHIS2
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        //const accessToken = await authenticateAndGetAccessToken();
        const response = await fetch('https://data.research.dhis2.org/api/programs.json', {
          headers: {
            Authorization: "Basic " + btoa('admin:district'),
          },
        });
        const data = await response.json();
        setPrograms(data.programs); 
      } catch (error) {
        setError('Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Fetch Patients 
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        //const accessToken = await authenticateAndGetAccessToken();
        const response = await fetch('https://data.research.dhis2.org/api/patients.json', {
          headers: {
            Authorization: "Basic " + btoa('admin:district'),
          },
        });
        const data = await response.json();
        setPatients(data.trackedEntityInstances); 
      } catch (error) {
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
    //const accessToken = await authenticateAndGetAccessToken();

    try {
      const enrollmentDetails = {
        program: formData.programId,
        trackedEntityInstance: formData.patientId, // Unique patient ID
        orgUnit: formData.orgUnit, // Selected organization unit
        enrollmentDate: formData.enrollmentDate, // Enrollment date
      };

      // API call to enroll the patient 
      await fetch('https://data.research.dhis2.org/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:"Basic " + btoa('admin:district'),
        },
        body: JSON.stringify(enrollmentDetails),
      });

      // Example reminder scheduling 
      const reminderDetails = {
        message: `Hello ${formData.patientId}, this is your reminder.`,
        date: formData.enrollmentDate, // Example date, can be adjusted
      };
      await scheduleReminder(formData.programId, reminderDetails, accessToken);

      console.log('Patient enrolled and reminder scheduled.');
    } catch (error) {
      setError('Error enrolling patient or scheduling reminder');
      console.error(error);
    }
  };

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
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              orgUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))
            )}
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
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.displayName}
                </option>
              ))
            )}
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
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))
            )}
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
        <button type="submit" disabled={loading}>Enroll</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Enroll;


