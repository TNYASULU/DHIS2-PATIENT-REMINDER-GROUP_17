import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  return (

    <>
    <div className="menuBtn">
  
    </div>
    <div className="sidebar">
      <section>
      <h2 className="sidebarHeader">Main Menu</h2>
        <ul>
            <NavLink className="listItem menuItem" to="./patients">Patient</NavLink>
            
            <NavLink className="listItem menuItem" to="./reminder">Reminder</NavLink>
            
            {/* <NavLink className="listItem menuItem"  to="./appointment">Appointment</NavLink> */}
            
          
            <NavLink className="listItem menuItem" to="./Enrollment">Enrollment</NavLink>
            
            <NavLink className="listItem menuItem" to="./Registration">Registration</NavLink>
            
            <NavLink className="listItem menuItem" to="./SMSIntegration">SMSIntegration</NavLink>
            
        
        </ul>
      </section>

    </div>
    </>
  );
};

export default Sidebar;


