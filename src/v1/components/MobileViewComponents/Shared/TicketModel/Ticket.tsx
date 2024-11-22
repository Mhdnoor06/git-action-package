// Ticket.tsx
import React from "react";
import "./Ticket.css";
interface TicketProps {
  title: string | undefined;
  time: string | undefined;
  date: string | undefined;
  seats: string | number | undefined;
  price: string | number | undefined;
  color?: string;
  totalSeatsBooked: number | undefined;
  isCancelled: boolean;
}
const Ticket: React.FC<TicketProps> = ({
  title,
  time,
  date,
  seats,
  price,
  color = "#d9d9d9",
  totalSeatsBooked,
  isCancelled,
}) => {
  // console.log(price);
  const TruncateText = (text: string | undefined, maxLength = 18) => {
    // Trim the text to the specified maxLength and add ellipsis if necessary
    if (text === undefined) return;
    const trimmedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return trimmedText;
  };
  return (
    <>
      <div className="center">
        <div className="ticket">
          <div className="left-t" style={{ background: color }}>
            <div className="content-left">
              <div className="tkt_title">{TruncateText(title)}</div>
              <div className="">
                <div className="top">
                  <h3
                    style={
                      isCancelled
                        ? {
                            color: "rgb(255, 114, 114)",
                            textDecoration: "line-through",
                          }
                        : {}
                    }
                  >
                    {time}
                  </h3>
                </div>
                <div className="bottom">
                  <p>{date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="right-t" style={{ background: color }}>
            <div className="cuts right-cuts">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="cut"></div>
                ))}
            </div>
            <div className="content-right">
              <div className="tktname">
                <h3
                  style={
                    isCancelled
                      ? {
                          color: "rgb(255, 114, 114)",
                          textDecoration: "line-through",
                        }
                      : {}
                  }
                >{`${totalSeatsBooked}/${seats}`}</h3>
              </div>
              <div className="">
                <div className="top">
                  {Number(price) === 0 ? "Free" : `$${price}`}
                </div>
              </div>
            </div>
          </div>
          <div className="circles">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
