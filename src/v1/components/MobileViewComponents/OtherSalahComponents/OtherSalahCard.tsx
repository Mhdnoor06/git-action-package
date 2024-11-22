import { Card, Table } from "@mui/material";
import React, { useState } from "react";
import edit from "../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../photos/Newuiphotos/Icons/delete.svg";
import { SpecialPrayer } from "../../../redux/Types";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { dateFormatter, tmFormatter } from "../../../helpers/HelperFunction";

type propsType = {
  tZone: string;
  prayer: SpecialPrayer<number>;
  handleEdit: (val: SpecialPrayer<number>) => void;
  handleDelete: (val: string) => void;
  children?: React.ReactNode;
};

const OtherSalahCard = ({
  prayer,
  tZone,
  handleEdit,
  handleDelete,
  children
}: propsType) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  return (
    <>
      <Card className="special-card">
        <Table>
          <thead>
            <tr className="Prayer-card-header">
              <th>Prayer</th>
              <th>Adhan</th>
              <th>Iqama</th>
              {!children && <th></th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div
                  style={{
                    // paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "65px"
                  }}
                >
                  <p className="titleIcon" style={{ margin: "5px 0" }}>
                    {prayer.name}
                    {/* {prayer.name?.length > 7
                      ? prayer.name.substring(0, 7) + ".."
                      : prayer.name} */}
                  </p>
                </div>
              </td>
              <td>{tmFormatter(prayer.azaanTime, tZone)}</td>
              <td>{tmFormatter(prayer.jamaatTime, tZone)}</td>
              {!children && (
                <td className="action-container">
                  <img
                    src={edit}
                    className="edit-img"
                    alt="edit img"
                    onClick={() => handleEdit(prayer)}
                  />
                  <img
                    src={del}
                    className="del-img"
                    alt="delete img"
                    onClick={() => setShowDeleteWarning(true)}
                  />
                </td>
              )}
            </tr>
            {/* )} */}
          </tbody>
        </Table>
        <div className="special-date-container">
          <p> Start Date: {dateFormatter(prayer.startDate)}</p>
          <p>End Date: {dateFormatter(prayer.endDate)}</p>
        </div>

        {children}
      </Card>
      {showDeleteWarning && (
        <DeleteWarningCard
          wariningType="Delete"
          warining="Are you sure you want to
        Delete (Jummah) Special Timing ?"
          onClose={() => setShowDeleteWarning(false)}
          onConfirm={() => {
            setShowDeleteWarning(false);
            handleDelete(prayer._id ?? "");
          }}
        />
      )}
    </>
  );
};

export default OtherSalahCard;
