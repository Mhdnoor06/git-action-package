import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoreBtn from '../../v1/components/MobileViewComponents/Shared/MoreBtn';

describe('MoreBtn Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <MoreBtn
        tsx="This is a test description text that exceeds the default length to test the scroll functionality."
        txLength={250}
        {...props}
      />
    );
  };

  test('renders MoreBtn component', () => {
    renderComponent();
    expect(screen.getByText(/This is a test description text/)).toBeInTheDocument();
  });

  test('applies scroll styles when text length exceeds limit', () => {
    renderComponent();
    const paragraph = screen.getByText(/This is a test description text/);
    expect(paragraph).toHaveClass('profile-des-text');
  });

  test('does not apply scroll styles when text length is within limit', () => {
    render(<MoreBtn tsx="Short text" txLength={50} />);
    const paragraph = screen.getByText(/Short text/);
    expect(paragraph).not.toHaveClass('profile-des-text');
  });

  test('applies custom height when provided', () => {
    const height = "100px";
    renderComponent({ height });
    const styleElement = document.querySelector('style');
    expect(styleElement).toHaveTextContent(`height:${height}`);
  });

  test('uses default height when custom height is not provided', () => {
    renderComponent();
    const styleElement = document.querySelector('style');
    expect(styleElement).toHaveTextContent('height:70px');
  });
});
