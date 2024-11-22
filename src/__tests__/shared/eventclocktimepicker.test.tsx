import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventClockTimePicker from '../../v1/components/MobileViewComponents/Shared/EventClockTimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from 'dayjs';
import { vi } from 'vitest';

describe('EventClockTimePicker Component', () => {
  const mockFormDataSetter = vi.fn();
  const setPickerOpen = vi.fn();

  beforeEach(() => {
    mockFormDataSetter.mockClear();
    setPickerOpen.mockClear();
  });

  const renderComponent = (props = {}) => {
    return render(
        <div>
            <div data-testid="outside-click">Outside Click</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EventClockTimePicker
          tim="10:00"
          label="Event Time"
          id="event-time"
          formDataSetter={mockFormDataSetter}
          error={null}
          pickerOpen={false}
          setPickerOpen={setPickerOpen}
          {...props}
        />
      </LocalizationProvider>
      </div>
    );
  };

//   test('renders EventClockTimePicker component', () => {
//     renderComponent();
//     expect(screen.getByLabelText("Event Time")).toBeInTheDocument();
//   });


  test('opens and closes picker correctly', () => {
    renderComponent();
    const timeInput = screen.getByLabelText("Event Time");
    fireEvent.click(timeInput)
    expect(screen.getByRole('dialog')).toBeInTheDocument();  
    fireEvent.click(screen.getByText(/cancel/i))
    expect(setPickerOpen).toHaveBeenCalledWith(false);

  });

  test('applies custom styles when there is an error', async () => {
    renderComponent({ error: 'Required field' });
    const timePicker = screen.getByTestId('time-picker-event-time');
    await waitFor(()=>{

        expect(timePicker.querySelector('#event-time')).toHaveStyle('border: 0px');
    })
  });
});
