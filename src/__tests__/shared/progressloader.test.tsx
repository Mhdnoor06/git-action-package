import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProgressLoader from '../../v1/components/MobileViewComponents/Shared/Loader/Loader';

describe('ProgressLoader Component', () => {
  test('renders correctly', () => {
    render(<ProgressLoader />);
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  test('contains CircularProgress', () => {
    render(<ProgressLoader />);
    const circularProgress = screen.getByTestId('circular-progress');
    expect(circularProgress).toBeInTheDocument();
    expect(circularProgress).toHaveClass('loader');
  });

  test('has correct styles for centering', () => {
    render(<ProgressLoader />);
    const divElement = screen.getByTestId('circular-progress').parentElement;
    expect(divElement).toHaveStyle({
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    });
  });
});
