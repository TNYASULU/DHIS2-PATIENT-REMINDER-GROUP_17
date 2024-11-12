import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => (
    <div className="sidebar">
        <nav>
            <NavLink to="/patients" activeClassName="active">
                
            </NavLink>
            <NavLink to="/register" activeClassName="active">
                
            </NavLink>
            <NavLink to="/enroll" activeClassName="active">
                
            </NavLink>
            <NavLink to="/messages" activeClassName="active">
                
            </NavLink>
            <NavLink to="/follow-up" activeClassName="active">
            
            </NavLink>
            <NavLink to="/progress" activeClassName="active">
            
            </NavLink>
        </nav>
    </div>
);

export default Sidebar;
