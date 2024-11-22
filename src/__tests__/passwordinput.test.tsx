import React, { useRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import PasswordInput from '../v1/pages/Shared/PasswordInput/PasswordInput';
const TestComponent = ({ belowTx = true }) => {
  const inputRef = useRef(null);
  const [showPas, setShowPas] = useState(false);

  return (
    <PasswordInput
      reference={inputRef}
      pHolder="Enter your password"
      isPasswordVisible={showPas}
      setIsPasswordVisible={setShowPas}
    />
  );
};

describe('PasswordInput component', () => {
  it('should render the password input with appropriate attributes', () => {
    render(<TestComponent />);

    const inputElement = screen.getByPlaceholderText('Enter your password');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should toggle password visibility when the eye icon is clicked', () => {
    render(<TestComponent />);

    const inputElement = screen.getByPlaceholderText('Enter your password');
    expect(inputElement).toHaveAttribute('type', 'password');

    const showIcon = screen.getByTestId('hide-password');
    fireEvent.click(showIcon);
    expect(inputElement).toHaveAttribute('type', 'text');

    // Click to hide password again
    const hideIcon = screen.getByTestId('show-password');
    fireEvent.click(hideIcon);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  
});