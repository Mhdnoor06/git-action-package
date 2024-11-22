import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FinancialServiceFields from '../../v1/components/MobileViewComponents/Services/View/ServiceFields/FinancialServiceFields';

// Reusable render function
const renderComponent = (props:any) => render(<FinancialServiceFields {...props} />);

describe('FinancialServiceFields Component', () => {
  it('renders assistance types correctly when formData has assistanceTypes', () => {
    const mockFormData = {
      assistanceTypes: ['Financial', 'Medical'],
      questions: []
    };

    renderComponent({ formData: mockFormData });

    expect(screen.getByText(/What kind of assistance are you Providing/i)).toBeInTheDocument();
    expect(screen.getByText('Financial')).toBeInTheDocument();
    expect(screen.getByText('Medical')).toBeInTheDocument();
  });

  it('renders questions correctly when formData has questions', () => {
    const mockFormData = {
      assistanceTypes: [],
      questions: [
        { question: 'What is your monthly income?', responseType: 'Text' },
        { question: 'Do you have any dependents?', responseType: 'Yes/No' }
      ]
    };

    renderComponent({ formData: mockFormData });

    expect(screen.getByText(/Screening Question For the User/i)).toBeInTheDocument();
    expect(screen.getByText('What is your monthly income?')).toBeInTheDocument();
    expect(screen.getByText('Response Type : Text')).toBeInTheDocument();
    expect(screen.getByText('Do you have any dependents?')).toBeInTheDocument();
    expect(screen.getByText('Response Type : Yes/No')).toBeInTheDocument();
  });

  it('renders without crashing when formData is undefined', () => {
    renderComponent({ formData: undefined });

    expect(screen.getByText(/What kind of assistance are you Providing/i)).toBeInTheDocument();
    expect(screen.getByText(/Screening Question For the User/i)).toBeInTheDocument();
  });

  it('renders without crashing when assistanceTypes and questions are empty arrays', () => {
    const mockFormData = {
      assistanceTypes: [],
      questions: []
    };

    renderComponent({ formData: mockFormData });

    expect(screen.getByText(/What kind of assistance are you Providing/i)).toBeInTheDocument();
    expect(screen.getByText(/Screening Question For the User/i)).toBeInTheDocument();
  });
});
