import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import StepMenu from './components/StepMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <StepMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/step1" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
          <Route path="/step5" element={<Step5 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
