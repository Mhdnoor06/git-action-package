// eslint-disable-next-line import/no-anonymous-default-export
type Time = string[];
const initialDate: Time = [];
type TimingAction = {
  type: string;
  payload: Time;
};
const TimingReducer = (
  selectedDate: Time = initialDate,
  action: TimingAction
) => {
  switch (action.type) {
    case "singleDate":
      return action.payload;
    case "rangeDate":
      return action.payload;

    default:
      return selectedDate;
  }
};

export default TimingReducer;
