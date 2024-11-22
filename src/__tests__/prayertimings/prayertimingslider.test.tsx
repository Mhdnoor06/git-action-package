import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import PrayerTimingSlider from '../../v1/components/MobileViewComponents/Shared/Slider/CustomSlider';
import Slider from 'react-slick';

vi.mock('react-slick', () => {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
  };
});

vi.mock('../PreNextBtn', () => {
  return {
    __esModule: true,
    default: vi.fn(({ isPre, btnHandler }) => (
      <button onClick={btnHandler}>
        {isPre ? 'Previous' : 'Next'}
      </button>
    )),
  };
});

describe('PrayerTimingSlider', () => {
  const setIsMobileHandler = vi.fn();
  const setCurrentSliderIdx = vi.fn();
  const sliderRef = React.createRef();
  const goNext = vi.fn();
  const goPrev = vi.fn();
  const children = [<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>];

  beforeEach(() => {
    window.innerWidth = 1024;
    fireEvent.resize(window);
  });

  test('renders slider with children in desktop view', () => {
    render(
      <PrayerTimingSlider
        setIsMobileHandler={setIsMobileHandler}
        setCurrentSliderIdx={setCurrentSliderIdx}
        sliderRef={sliderRef}
        goNext={goNext}
        goPrev={goPrev}
        children={children}
      />
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  test('renders slider with children in mobile view', () => {
    window.innerWidth = 500;
    fireEvent.resize(window);

    render(
      <PrayerTimingSlider
        setIsMobileHandler={setIsMobileHandler}
        setCurrentSliderIdx={setCurrentSliderIdx}
        sliderRef={sliderRef}
        goNext={goNext}
        goPrev={goPrev}
        children={children}
      />
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

});
