import React from "react";
import BackButton from "../Shared/BackButton";
import MoreBtn from "../Shared/MoreBtn";
import moment from "moment";
import { dateReverter } from "../../../helpers/HelperFunction";

type announcement = {
  id: string | undefined;
  title: string | undefined;
  body: string | undefined;
  createdAt: string | undefined;
};
type PropsType = {
  handleAnnouncement: () => void;
  detailView?: boolean;
  title?: string;
  description?: string;
  announcementData?: announcement | undefined;
};

function AnnouncementCard({
  handleAnnouncement,
  detailView,
  title,
  description,
  announcementData,
}: PropsType) {
  let tZone = localStorage.getItem("MasjidtZone");
  return (
    <div>
      {!detailView ? (
        <>
          <div className="announcement">
            <BackButton handleBackBtn={handleAnnouncement} />
            <h3
              style={{
                color: "#3D5347",
                // width: "100%",
                flex: "1",
                textAlign: "center",
                marginRight: "90px",
                fontSize: "20px",
              }}
            >
              History
            </h3>
            {/* <p></p> */}
          </div>
          <div className="announcementDetailCard">
            <span>
              <h3 style={{ color: "#1D785A", fontSize: "16px" }}>
                {announcementData?.title}
              </h3>
              <p style={{ margin: "0" }}>
                {moment(
                  dateReverter(announcementData?.createdAt, tZone),
                  "YYYY-MM-DD"
                ).format("D MMM yyyy")}{" "}
              </p>
            </span>
            <p className="announcedes announcement-body">
              <MoreBtn
                tsx={announcementData?.body}
                txLength={announcementData?.body?.length}
                height={announcementData?.body?.length > 500 ? "340px" : ""}
              />
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="announcement">
            <BackButton handleBackBtn={handleAnnouncement} />
            <h3
              style={{
                color: "#3D5347",
                // width: "100%",
                flex: "1",
                textAlign: "center",
                marginRight: "90px",
                fontSize: "20px",
              }}
            >
              History
            </h3>
            {/* <p></p> */}
          </div>
          <div className="announcementDetailCard">
            <span>
              <h3 style={{ color: "#1D785A", fontSize: "16px" }}>{title}</h3>
              <p style={{ margin: "0" }}>
                {moment(new Date(), "YYYY-MM-DD").format("D MMM yyyy")}{" "}
              </p>
            </span>
            <p className="announcedes">
              <MoreBtn
                tsx={description}
                txLength={description.length}
                height={description.length > 500 ? "390px" : ""}
              />
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default AnnouncementCard;
