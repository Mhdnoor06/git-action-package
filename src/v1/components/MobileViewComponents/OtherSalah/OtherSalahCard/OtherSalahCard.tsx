import React from "react";
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import "./OtherSalahCard.css";
import edit from "../../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../../photos/Newuiphotos/Icons/delete.svg";
import Sunicon from "../../../../photos/Newuiphotos/Icons/prayerIcons/dhur.webp";
import moon from "../../../../photos/Newuiphotos/Icons/prayerIcons/isha.webp";

interface Timings {
  startDate: string | null;
  endDate: string | null;
  azanTime: string | null;
  iqamaTime: string | null;
}

interface OtherSalahCardProps {
  title: string;
  icon: React.ReactNode;
  timings: Timings[];
  onEdit: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}

const OtherSalahCard: React.FC<OtherSalahCardProps> = ({
  title,
  icon,
  timings,
  onEdit,
  onDelete,
  children,
}) => {
  return (
    <div className="other-salah-card-container">
      <Card className="other-salah-card">
        <div className="other-salah-header">
          <div
            className="other-salah-title"
            style={children ? { left: "0" } : undefined}
          >
            <span className="icon">
              {title.toLowerCase().startsWith("taraweeh") ||
              title.toLowerCase().startsWith("qayam") ? (
                <img src={moon} alt="" className="icon" />
              ) : (
                <img src={Sunicon} alt="" className="icon" />
              )}
            </span>
            <Typography variant="h6" component="div" className="title-text">
              {title}
            </Typography>
          </div>
          {!children && (
            <div className="other-salah-actions">
              <IconButton onClick={onEdit} size="small">
                <img
                  src={edit}
                  alt=""
                  style={{ width: "12px", height: "12px" }}
                />
              </IconButton>
              <IconButton onClick={onDelete} size="small" color="error">
                <img
                  src={del}
                  alt=""
                  style={{ width: "14px", height: "14px" }}
                />
              </IconButton>
            </div>
          )}
        </div>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ borderRadius: "0" }}
        >
          <Table size="small" aria-label="Jummah timings">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Date Range</TableCell>
                {title.toLowerCase().startsWith("jumma") && (
                  <TableCell className="table-header">Adhan</TableCell>
                )}
                <TableCell className="table-header">Iqama</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timings.map((time, index) => (
                <>
                  {title.toLowerCase().startsWith("eid") && index > 0 && (
                    <TableRow key={`eid-${index}`} className="table-row">
                      <TableCell colSpan={3} className="title-text">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span className="icon">
                            {title.toLowerCase().startsWith("taraweeh") ||
                            title.toLowerCase().startsWith("qayam") ? (
                              <img src={moon} alt="" className="icon" />
                            ) : (
                              <img src={Sunicon} alt="" className="icon" />
                            )}
                          </span>
                          <Typography
                            variant="h6"
                            component="div"
                            className="title-text"
                          >
                            {children
                              ? `${title.split(" ")[0]} ${index + 1}`
                              : `${title} ${index + 1}`}
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow key={index} className="table-row">
                    <TableCell className="table-cell">
                      {time.startDate} to {time.endDate}
                    </TableCell>
                    {title.toLowerCase().startsWith("jumma") && (
                      <TableCell className="table-cell">
                        {time.azanTime ? time.azanTime : "-:-"}
                      </TableCell>
                    )}
                    <TableCell className="table-cell">
                      {time.iqamaTime}
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {children}
      </Card>
    </div>
  );
};

export default OtherSalahCard;
