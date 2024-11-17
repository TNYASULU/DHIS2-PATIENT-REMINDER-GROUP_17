
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import classes from './App.module.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration/Registration";
import Sidebar from "./Components/sidebar/sidebar";
import Enrollment from "./Components/Enrollment/enroll";
import { DataProvider } from '@dhis2/app-runtime';

const config = {
  //  instance configuration here
  baseUrl: 'https://play.dhis2.org/40.2.0',
};


const MyApp = () => (
  <BrowserRouter>
    <div className="homeContainer">
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<div> Welcome</div>} />
          <Route path="/reminder" element={<div>Reminder</div>} />
          <Route path="/enroll-patients" element={<Enrollment/>} />
          <Route path="/patients" element={<Patients />} />
          
          <div className="homeContainer">
      <sidebar />
      <div className="contentWrapper">
        <Routes>

          <Route path="" element={Registration} />
        </Routes>
      </div>
    </div>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default MyApp;
