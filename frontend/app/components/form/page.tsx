'use client';

import React, { useState } from 'react';
import type { FormData, Question } from './formTypes';

const questions: (Question & { field: keyof FormData })[] = [
  { id: 1, text: 'What is the name of the café?', field: 'name' },
  { id: 2, text: 'Where is the café located?', field: 'location' },
];

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const isLastStep = currentStep === questions.length - 1;
  const question = questions[currentStep];

  return (
    <main>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor={question.field}>{question.text}</label>
        <input
          id={question.field}
          name={question.field}
          value={formData[question.field]}
          onChange={handleChange}
        />
        <div>
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {isLastStep ? (
            <button type="submit">Submit</button>
          ) : (
            <button type="button" onClick={() => setCurrentStep((s) => s + 1)}>
              Next
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
