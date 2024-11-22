import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import moment from 'moment';

import NikahServiceFields from '../../v1/components/MobileViewComponents/Services/View/ServiceFields/NikahServiceFields';
import { displayTiming } from '../../v1/helpers/HelperFunction';

// Mock the displayTiming function
vi.mock('../../v1/helpers/HelperFunction', () => ({
  displayTiming: vi.fn(),
}));

// Reusable render function
const renderComponent = (formData: any) => {
  render(<NikahServiceFields formData={formData} />);
};

describe('NikahServiceFields Component', () => {
  it('renders without crashing', () => {
    renderComponent({});
    expect(screen.queryByText('Availability Time')).toBeNull();
  });

  it('displays "Daily" when metaData.type is "daily"', () => {
    const formData = {
      metaData: { type: 'daily', days: [] },
    };
    renderComponent(formData);
    expect(screen.getByText('Availability Time')).toBeInTheDocument();
    expect(screen.getByText('Daily')).toBeInTheDocument();
  });

  it('displays "Weekly" with days when metaData.type is "weekly"', () => {
    const formData = {
      metaData: { type: 'weekly', days: ['Monday', 'Wednesday'] },
    };
    renderComponent(formData);
    expect(screen.getByText('Weekly (Monday, Wednesday)')).toBeInTheDocument();
  });

  it('displays "Every Month on" with formatted dates when metaData.type is "custom"', () => {
    const formData = {
      metaData: { type: 'custom', days: ['2023/10/01', '2023/10/15'] },
    };
    renderComponent(formData);
    const expectedText = `Every Month on 1st, 15th`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('displays the timing from displayTiming function', () => {
    const timing = { startTime: '10:00', endTime: '12:00' };
    (displayTiming as Mock).mockReturnValue('10:00 - 12:00');
    const formData = { timing };
    renderComponent(formData);
    expect(screen.getByText('10:00 - 12:00')).toBeInTheDocument();
  });
});
