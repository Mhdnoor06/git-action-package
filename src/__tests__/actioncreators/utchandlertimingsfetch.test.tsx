import { describe, it, expect } from 'vitest';
import moment from 'moment-timezone';
import { UTCTimeHandler } from '../../v1/components/MobileViewComponents/TimingsFetch/TimingsFetch';

describe('UTCTimeHandler', () => {
  it('should convert time, date, and timezone to UTC timestamp', () => {
    const time = "14:30";
    const date = "05-07-2024";
    const tzone = "America/New_York";

    const expectedTimestamp = moment.tz("2024-07-05 14:30", tzone).unix();
    const result = UTCTimeHandler(time, date, tzone);

    expect(result).toBe(expectedTimestamp);
  });

  it('should handle different timezones correctly', () => {
    const time = "09:00";
    const date = "12-12-2023";
    const tzone = "Europe/London";

    const expectedTimestamp = moment.tz("2023-12-12 09:00", tzone).unix();
    const result = UTCTimeHandler(time, date, tzone);

    expect(result).toBe(expectedTimestamp);
  });

  it('should handle invalid timezone gracefully', () => {
    const time = "08:00";
    const date = "01-01-2022";
    const tzone = "Invalid/Timezone";
  });
});
