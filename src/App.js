import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration/Register";
import Sidebar from "./Components/sidebar/sidebar"; 
import Enrollment from "./Components/Enrollment/enroll";
import Patients from "./Components/patients/patients";
import { Welcome } from "./Components/welcome/Welcome";
import SMSIntegration from "./Components/SMSIntegration/SMSComponent"

const MyApp = () => {
  return (
    <BrowserRouter className="app">
      <div className="homeContainer">
        <Sidebar /> 
        <div className="contentWrapper">
          <Routes>
            <Route index element={<Welcome/> } />
            <Route path="/reminder" element={<div>Reminder</div>} />
            <Route path="/enroll-patients" element={<Enrollment />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/SMSIntegration" element={<SMSIntegration />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MyApp;
