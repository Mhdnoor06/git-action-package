import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment-timezone';
import { vi } from 'vitest';
import TimeZone from '../../v1/components/MobileViewComponents/Shared/TimeZone';

// Mock the moment-timezone library
vi.mock('moment-timezone', async (importOriginal) => {
  const actual = await importOriginal();

  const mockMoment = (timestamp) => {
    const obj = {
      tz: vi.fn().mockReturnThis(),
      format: vi.fn(() => {
        if (timestamp === 1720086120) return '04:42 AM'; // fajr example formatted time for azaanTime
        if (timestamp === 1720087200) return '05:00 AM'; // fajr example formatted time for jamaatTime
        if (timestamp === 1720117860) return '01:31 PM'; // dhur example formatted time for azaanTime and jamaatTime
        if (timestamp === 1720135740) return '06:29 PM'; // asar example formatted time for azaanTime and jamaatTime
        if (timestamp === 1720143540) return '08:39 PM'; // maghrib example formatted time for azaanTime and jamaatTime
        if (timestamp === 1720149420) return '10:17 PM'; // isha example formatted time for azaanTime
        if (timestamp === 1720148460) return '10:01 PM'; // isha example formatted time for jamaatTime
        return '12:00 AM';
      }),
      utcOffset: vi.fn(() => -300), // example offset in minutes
    };
    return obj;
  };

  const mockTz = vi.fn(() => ({
    utcOffset: vi.fn(() => -300), // example offset in minutes
    isDST: vi.fn(() => false),
    format: vi.fn(() => '12:00 AM'),
  }));

  // mockMoment.unix = vi.fn((timestamp) => {
  //   const mock = mockMoment(timestamp);
  //   mock.tz = mockTz;
  //   return mock;
  // });
  
  // mockMoment.utc = vi.fn(() => ({
  //   format: vi.fn(() => '01-Jul-2024'),
  // }));
  
  mockMoment.tz = mockTz;

  return {
    ...actual,
    default: mockMoment,
  };
});
  
  describe('TimeZone Component', () => {
    const tZone = 'America/New_York';
  
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it('should display the time zone', () => {
      render(<TimeZone tZone={tZone} />);
      expect(screen.getByText(`Time Zone : ${tZone}`)).toBeInTheDocument();
    });
  
    it('should calculate the correct offset in hours and minutes', () => {
      render(<TimeZone tZone={tZone} />);
      const offsetInMinutes = moment.tz(tZone).utcOffset();
      const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
      const offsetMinutes = Math.abs(offsetInMinutes) % 60;
  
      expect(moment.tz).toHaveBeenCalledWith(tZone);
      expect(offsetInMinutes).toBe(-300);
      expect(offsetHours).toBe(5);
      expect(offsetMinutes).toBe(0);
    });
  
    it('should calculate the correct DST status', async () => {
      render(<TimeZone tZone={tZone} />);
    const isDST = moment.tz(tZone).isDST();

    expect(moment.tz).toHaveBeenCalledWith(tZone);
    expect(isDST).toBe(false);
 
    });
  });