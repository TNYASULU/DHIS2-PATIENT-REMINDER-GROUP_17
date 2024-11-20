import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
 
  // const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // List of options

  return (

    <>
    <div className="menuBtn">
      {/* menuBtn  */}
    </div>
    <div className="sidebar">
      <section>
      <h2 className="sidebarHeader">Main Menu</h2>
        <ul>
          <NavLink className="listItem menuItem" to="./patients">Patient</NavLink>
          <NavLink className="listItem menuItem"  to="./reminder">Reminder</NavLink>
          {/* <NavLink className="listItem menuItem"  to="./appointment">Appointment</NavLink> */}
          <NavLink className="listItem menuItem"  to="./enroll-patients">Enroll Patients</NavLink>
          <NavLink className="listItem menuItem"  to="./enroll-demo">Enroll demo</NavLink>
          
        </ul>
      </section>

    </div>
    </>
  );
};

export default Sidebar;


