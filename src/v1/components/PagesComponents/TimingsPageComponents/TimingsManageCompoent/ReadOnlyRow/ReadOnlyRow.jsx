import React from "react";

const ReadOnlyRow = ({ Namaz, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{Namaz.namazName}</td>
      <td>{Namaz.azaanTime}</td>
      <td>{Namaz.jamaatTime}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, Namaz)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
