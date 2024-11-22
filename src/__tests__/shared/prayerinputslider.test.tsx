import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrayerInputSlider from '../../v1/components/MobileViewComponents/Shared/Slider/PrayerInputSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { vi } from 'vitest';

// Mock Swiper and its children
vi.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }) => <div {...props}>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

describe('PrayerInputSlider Component', () => {
  const setIsMobileHandler = vi.fn();
  const setCurrentSliderIdx = vi.fn();
  const swiperRef = React.createRef();

  const renderComponent = () =>
    render(
      <PrayerInputSlider
        setIsMobileHandler={setIsMobileHandler}
        setCurrentSliderIdx={setCurrentSliderIdx}
        swiperRef={swiperRef}
        goNext={() => {}}
        goPrev={() => {}}
      >
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </PrayerInputSlider>
    );

  test('renders correctly', () => {
    renderComponent();
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  test('handles resize event', () => {
    renderComponent();

    // Mock the resize event
    global.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    expect(setIsMobileHandler).toHaveBeenCalledWith(true);

    global.innerWidth = 800;
    fireEvent(window, new Event('resize'));
    expect(setIsMobileHandler).toHaveBeenCalledWith(false);
  });

  test('displays Swiper in mobile view', () => {
    renderComponent();

    global.innerWidth = 500;
    fireEvent(window, new Event('resize'));

    expect(screen.getByRole('presentation')).toBeInTheDocument(); // Swiper container
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  test('displays children directly in non-mobile view', () => {
    renderComponent();

    global.innerWidth = 800;
    fireEvent(window, new Event('resize'));
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument(); // Swiper container

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });
});
