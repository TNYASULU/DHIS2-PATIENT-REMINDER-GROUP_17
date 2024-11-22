import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration/Registration";
import sidebar from "./Components/sidebar/sidebar";
import Enrollment from "./Components/Enrollment/enroll";
import Patients from './Components/patients/patients';

const MyApp = () => {
  return (
    <div className="homeContainer">
      <sidebar /> 
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/reminder" element={<div>Reminder</div>} />
          <Route path="/enroll-patients" element={<Enrollment />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/registration" element={<Registration />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default MyApp;