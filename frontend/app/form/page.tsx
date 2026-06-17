'use client';

import React, { useState } from 'react';
import type { FormData } from './form.types';
import { useSearchPlaces } from '../../hooks/useCafes';
import { useDebounce } from '../../hooks/useDebounce';
type Question = {
  id: number;
  text: string;
};
const questions: (Question & { field: keyof FormData })[] = [
  { id: 1, text: 'What is the name of the café?', field: 'place' },
  { id: 2, text: 'Add some vibes you have picked up', field: 'vibes' },
];
export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    place: '',
    vibes: [],
  });
  const [query, setQuery] = useState({ query: '' });
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(query);
    const { name, value } = e.target;
    setQuery((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSelected(false);
  };

  const handleSelected = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedPlace = e.currentTarget.getAttribute('value');
    if (selectedPlace) {
      setFormData((prevData) => ({
        ...prevData,
        place: selectedPlace,
      }));
      setSelected(true);
      setQuery({ query: '' });
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputValue = (e.target as HTMLInputElement).value.trim();
      if (inputValue) {
        setFormData((prevData) => ({
          ...prevData,
          vibes: [...prevData.vibes, inputValue],
        }));
        (e.target as HTMLInputElement).value = '';
        setSelected(false);
      }
    }
    console.log('Current vibes:', formData.vibes);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const isLastStep = currentStep === questions.length - 1;
  const isFirstStep = currentStep === 0;
  const question = questions[currentStep];
  const debouncedQuery = useDebounce(query.query, 300);
  const { data: searchResults, isLoading, error } = useSearchPlaces(debouncedQuery);

  return (
    <main>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {currentStep === 0 && (
            <>
              <div>
                <label htmlFor={question.field}>{question.text}</label>
                <input id="0" name="query" value={query.query || ''} onChange={handleChange} />
              </div>
              <div>
                {!selected && (
                  <ul>
                    {!formData.place && <p>Start typing to search for cafes…</p>}
                    {isLoading && <p>Loading cafes…</p>}
                    {error && <p>Failed to load cafes: {error.message}</p>}
                    {searchResults && searchResults.length === 0 && <p>No cafes yet.</p>}
                    {searchResults?.map((r) => (
                      <li key={r.name} value={r.name} onClick={handleSelected}>
                        {r.name}
                      </li>
                    ))}
                  </ul>
                )}
                {selected && (
                  <div>
                    <p>Selected place: {formData.place}</p>
                    <button type="button" onClick={() => setFormData({ place: '', vibes: [] })}>
                      X
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div>
         
          {currentStep === 1 && (
             <div>
            <div>
              <p>{question.text}</p>
            <input
              type="text"
              name="vibe"
              placeholder="Enter a vibe"
              onKeyDown={handleEnter}
            />
            </div>
            <ul>
              {formData.vibes.map((vibe, index) => (
                <li key={index}>{vibe}
                <button type="button" onClick={() => setFormData((prevData) => ({
                  ...prevData,
                  vibes: prevData.vibes.filter((_, i) => i !== index),
                }))}>
                      X
                    </button></li>
              ))}
            </ul></div>
          )} 
          <button type="button" onClick={() => setCurrentStep((s) => s - 1)} disabled={isFirstStep}>
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
