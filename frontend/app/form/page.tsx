'use client';

import React, { useState } from 'react';
import type { FormData } from './form.types';
import { useSearchPlaces } from '../../hooks/useCafes';
import {useDebounce} from '../../hooks/useDebounce';
type Question = {
  id: number;
  text: string;
};
const questions: (Question & { field: keyof FormData })[] = [
  { id: 1, text: 'What is the name of the café?', field: 'query' },
  { id: 2, text: 'Add some vibes you have picked up', field: 'vibes' },
];

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    query: '',
    vibes: [],
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
const { data: searchResults, isLoading, error } = useSearchPlaces(formData.query);


  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const isLastStep = currentStep === questions.length - 1;
  const question = questions[currentStep];
  const debouncedQuery = useDebounce(formData.query, 300);

  return (
    <main>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor={question.field}>{question.text}</label>
        <input
          id={question.field}
          name={question.field}
          value={formData[question.field] || ''}
          onChange={handleChange}
        />
        <div>
          {currentStep === 0 && (
            <ul>
              {isLoading && <p>Loading cafes…</p>}
              {error && <p>Failed to load cafes: {error.message}</p>}
              {searchResults && searchResults.length === 0 && <p>No cafes yet.</p>}
              {searchResults?.map((place) => (
                <li key={place.name} value={place.name} onClick={() => setFormData((prev) => ({ ...prev, query: place.name }))}>
                  {place.name}
                </li>
              ))}
            </ul>
          )}
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
