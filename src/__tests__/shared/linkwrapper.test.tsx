import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LinkWrapper from '../../v1/components/MobileViewComponents/Shared/LinkWrapperProps/LinkWrapperProps';

describe('LinkWrapper Component', () => {
  const url = 'https://example.com';
  const children = <span>Click me!</span>;

  test('renders correctly', () => {
    render(<LinkWrapper url={url}>{children}</LinkWrapper>);
    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  test('has correct URL', () => {
    render(<LinkWrapper url={url}>{children}</LinkWrapper>);
    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });

  test('opens in a new tab', () => {
    render(<LinkWrapper url={url}>{children}</LinkWrapper>);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  test('has noopener and noreferrer', () => {
    render(<LinkWrapper url={url}>{children}</LinkWrapper>);
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });

  test('renders children correctly', () => {
    render(<LinkWrapper url={url}>{children}</LinkWrapper>);
    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });
});
