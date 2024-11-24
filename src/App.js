import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration/Register";
import Sidebar from "./Components/sidebar/sidebar"; 
import Enrollment from "./Components/Enrollment/enroll";
import Patients from "./Components/patients/patients";

const MyApp = () => {
  return (
    <BrowserRouter> {/* Wrap the app with BrowserRouter */}
      <div className="homeContainer">
        <Sidebar /> {/* Corrected capitalization */}
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
    </BrowserRouter>
  );
};

export default MyApp;
