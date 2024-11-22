import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PreNextBtn from '../../v1/components/MobileViewComponents/Shared/PreNextBtn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { vi } from 'vitest';

describe('PreNextBtn Component', () => {
    const mockBtnHandler = vi.fn();
  
    const renderComponent = (isPre) => {
      return render(<PreNextBtn btnHandler={mockBtnHandler} isPre={isPre} />);
    };
  
    test('renders PreNextBtn component with ArrowBackIosIcon when isPre is true', () => {
      renderComponent(true);
      expect(screen.getByTestId('ArrowBackIosIcon')).toBeInTheDocument();
    });
  
    test('renders PreNextBtn component with ArrowForwardIosIcon when isPre is false', () => {
      renderComponent(false);
      expect(screen.getByTestId('ArrowForwardIosIcon')).toBeInTheDocument();
    });
  
    test('calls btnHandler when button is clicked', () => {
      renderComponent(true);
      const button = screen.getByLabelText('delete');
      fireEvent.click(button);
      expect(mockBtnHandler).toHaveBeenCalledTimes(1);
    });
  
    test('applies marginLeft style when isPre is true', () => {
      renderComponent(true);
      const button = screen.getByLabelText('delete').firstChild;
      expect(button).toHaveStyle({ marginLeft: '5px' });
    });
  
    test('does not apply marginLeft style when isPre is false', () => {
      renderComponent(false);
      const button = screen.getByLabelText('delete').firstChild;
      expect(button).not.toHaveStyle({ marginLeft: '5px' });
    });
  
    test('applies the correct styles from btnStyle', () => {
      renderComponent(true);
      const button = screen.getByLabelText('delete');
      expect(button).toHaveClass('next-previous-btn');
      expect(button).toHaveStyle({
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3), 0px 4px 20px rgba(0, 0, 0, 0.2)',
        background: 'white',
        fontSize: '8px',
        width: '28px',
        height: '28px',
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      });
    });
  });