type Time = string[];
type TimingAction = {
    type: string;
    payload: Time;
};
declare const TimingReducer: (selectedDate: Time | undefined, action: TimingAction) => Time;
export default TimingReducer;
//# sourceMappingURL=TimingReducer.d.ts.map