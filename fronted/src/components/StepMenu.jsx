import React from 'react';
import { NavLink } from 'react-router-dom';
import './StepMenu.css';

function StepMenu() {
  return (
    <nav className="step-menu">
      <NavLink to="/step1" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>1 - qadam</NavLink>
      <NavLink to="/step2" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>2 - qadam</NavLink>
      <NavLink to="/step3" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>3 - qadam</NavLink>
      <NavLink to="/step4" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>4 - qadam</NavLink>
      <NavLink to="/step5" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>5 - qadam</NavLink>
    </nav>
  );
}

export default StepMenu;
