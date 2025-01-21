import React, { useState } from 'react';
import StepMenu from '../components/StepMenu';
import StepOne from '../components/Step1';
import StepTwo from '../components/Step2';
import StepThree from '../components/Step3';
import StepFour from '../components/Step4';
import StepFive from '../components/Step5';

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1); 

  // Bosqichlarni aniqlash
  const steps = [
    { id: 1, name: 'Step 1: Register' },
    { id: 2, name: 'Step 2: Verify Email' },
    { id: 3, name: 'Step 3: Login' },
    { id: 4, name: 'Step 4: Upload Image' },
    { id: 5, name: 'Step 5: Comment' },
  ];

  // Har bir bosqichning kontentini boshqarish
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onNext={() => setCurrentStep(2)} />;
      case 2:
        return <StepTwo onNext={() => setCurrentStep(3)} />;
      case 3:
        return <StepThree onNext={() => setCurrentStep(4)} />;
      case 4:
        return <StepFour onNext={() => setCurrentStep(5)} />;
      case 5:
        return <StepFive />;
      default:
        return <StepOne onNext={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div>
      <h1>Welcome to the Multi-Step Application</h1>
      <StepMenu
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />
      <div>{renderStepContent()}</div>
    </div>
  );
};

export default HomePage;
