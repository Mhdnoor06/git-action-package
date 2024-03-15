import React, { Dispatch, SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CancelIcon from "@material-ui/icons/Cancel";
import Events from "../EventsComponent/Events";
import { EventType } from "../../../redux/Types";
type propsType = {
  OpenOn: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  eventData: EventType;
};
const EventModal = ({ OpenOn, setIsEditing, eventData }: propsType) => {
  return (
    <Dialog open={OpenOn} onClose={() => setIsEditing(false)}>
      <DialogTitle style={{ padding: 0 }}>
        <IconButton
          style={{ padding: 0 }}
          edge="end"
          color="primary"
          onClick={() => setIsEditing(false)}
        >
          <CancelIcon style={{ color: "red" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ padding: 0 }}>
        {" "}
        {
          <Events
            setIsEditing={setIsEditing}
            isFormDetailsPage={true}
            eventData={eventData}
          />
        }
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
