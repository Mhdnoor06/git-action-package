import { CommonActionType } from "../../Types";
import { COMPLETE_EVENT_EDITING } from "../../actiontype";

const CompletionEventReducer = (
  EventCompletion = false,
  action: CommonActionType
) => {
  switch (action.type) {
    case COMPLETE_EVENT_EDITING:
      return action.payload;

    default:
      return EventCompletion;
  }
};

export default CompletionEventReducer;
