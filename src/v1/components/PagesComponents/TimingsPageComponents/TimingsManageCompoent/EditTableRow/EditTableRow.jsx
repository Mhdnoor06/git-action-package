import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {

    
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Namaz Name"
          name="fullName"
          value={editFormData.namaazName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          id="outlined-required"
          disableunderline
          name="appt-time"
          sx={{ border: "1.5px solid grey", padding: "10px", borderRadius: 1 }}
          className="TimingsInput"
          value={editFormData.azaanTime}
          onChange={handleEditFormChange}
          // value={moment(CurrentSelectedDayTimings[0].jamaatTime * 1000).format('HH:mm')}
          type="time"
        />
      </td>
      <td>
      <input
          id="outlined-required"
          disableunderline
          name="appt-time"
          sx={{ border: "1.5px solid grey", padding: "10px", borderRadius: 1 }}
          className="TimingsInput"
          value={editFormData.azaanTime}
          onChange={handleEditFormChange}
          // value={moment(CurrentSelectedDayTimings[0].jamaatTime * 1000).format('HH:mm')}
          type="time"
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
