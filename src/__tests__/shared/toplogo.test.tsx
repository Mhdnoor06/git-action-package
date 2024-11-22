import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopLogo from '../../v1/components/MobileViewComponents/Shared/TopLogo';
import { vi } from 'vitest';
import LogoMain from '../../v1/photos/LogoMain.png';

describe('TopLogo Component', () => {
  it('should render the logo image', () => {
    render(<TopLogo />);
    const logo = screen.getByAltText('my masjid icon');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', LogoMain);
  });

  it('should have the correct class names', () => {
    render(<TopLogo />);
    const container = screen.getByAltText('my masjid icon').parentElement;
    expect(container).toHaveClass('Logo-Azan-MobileView');
    expect(container?.firstChild).toHaveClass('Logo-MobileView');
  });
});
