import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrayerBox from '../../v1/components/MobileViewComponents/Shared/PrayerBox/PrayerBox';
import noPrayer from '../../v1/photos/Newuiphotos/Icons/prayerIcons/nosalahtiming.webp';
import { NamajTiming } from '../../v1/redux/Types';
import { vi } from 'vitest';
import moment from 'moment';
vi.mock('moment', async (importOriginal) => {
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
      };
      return obj;
    };
    mockMoment.unix = vi.fn((timestamp) => mockMoment(timestamp));
    mockMoment.utc = vi.fn(() => ({
      format: vi.fn(() => '10:00 AM'),
    }));
    return {
      ...actual,
      default: mockMoment,
    };
  });
const mockPrayerTimings: NamajTiming<number | string>[] = [{"namazName":"Fajr","type":1,"azaanTime":1720086120,"jamaatTime":1720087200,"_id":"66826fe8372782b546e3bcf6"},{"namazName":"Dhur","type":2,"azaanTime":1720117860,"jamaatTime":1720117860,"_id":"66826fe8372782b546e3bcf7"},{"namazName":"Asar","type":3,"azaanTime":1720135740,"jamaatTime":1720135740,"_id":"66826fe8372782b546e3bcf8"},{"namazName":"Maghrib","type":4,"azaanTime":1720143540,"jamaatTime":1720143540,"_id":"66826fe8372782b546e3bcf9"},{"namazName":"Isha","type":5,"azaanTime":1720149420,"jamaatTime":1720148460,"_id":"66826fe8372782b546e3bcfa"}];

describe('PrayerBox Component', () => {
  test('renders correctly', () => {
    render(
      <PrayerBox tZone="America/Chicago" prayer={mockPrayerTimings} loading={false}>
        <div>Test Children</div>
      </PrayerBox>
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  test('displays loader when loading is true', () => {
    render(<PrayerBox tZone="America/Chicago" prayer={mockPrayerTimings} loading={true} />);
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  test('displays prayer timings table when loading is false', () => {
    render(<PrayerBox tZone="America/Chicago" prayer={mockPrayerTimings} loading={false} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('displays correct prayer timings', () => {
    render(<PrayerBox tZone="America/Chicago" prayer={mockPrayerTimings} loading={false} />);
    expect(screen.getByText('Fajr')).toBeInTheDocument();
    expect(screen.getByText('Dhur')).toBeInTheDocument();
    expect(screen.getByText('Asar')).toBeInTheDocument();
    expect(screen.getByText('Maghrib')).toBeInTheDocument();
    expect(screen.getByText('Isha')).toBeInTheDocument();
    expect(screen.getAllByText('04:42 AM')).toHaveLength(1);
    expect(screen.getAllByText('05:00 AM')).toHaveLength(1);
    expect(screen.getAllByText('01:31 PM')).toHaveLength(2);
    expect(screen.getAllByText('06:29 PM')).toHaveLength(2);
    expect(screen.getAllByText('08:39 PM')).toHaveLength(2);
    expect(screen.getAllByText('10:17 PM')).toHaveLength(1);
    expect(screen.getAllByText('10:01 PM')).toHaveLength(1);
  });

  test('displays no prayer image when no timings', () => {
    render(<PrayerBox tZone="America/Chicago" prayer={[]} loading={false} />);
    const noPrayerImg = screen.getByAltText('no prayer');
    expect(noPrayerImg).toBeInTheDocument();
    expect(noPrayerImg).toHaveAttribute('src', noPrayer);
  });
});
