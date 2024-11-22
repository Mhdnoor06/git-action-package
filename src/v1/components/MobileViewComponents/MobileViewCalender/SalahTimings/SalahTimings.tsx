import React, { useState } from "react";
import "./salah.css";
import salahClockIcon from "../../../../photos/Newuiphotos/salahpageicons/clockIcon.svg";
import { useNavigationprop } from "../../../../../MyProvider";
import BackButton from "../../Shared/BackButton";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import MobileViewCalender from "../MobileViewCalender";
import OtherSalahComponent from "../../OtherSalahComponents/OtherSalahComponent";
import OtherSalahMain from "../../OtherSalah/OtherSalahMain";

export type SalahType = "regular" | "other" | null;

interface SalahOptionProps {
  type: SalahType;
  isSelected: boolean;
  onClick: (type: SalahType) => void;
}

const SalahOption: React.FC<SalahOptionProps> = ({
  type,
  isSelected,
  onClick,
}) => {
  const title =
    type === "regular" ? "Regular Salah Timings" : "Other Salah Timings";
  const description =
    type === "regular"
      ? "e.g: Fajr, Dhur, Asr, Maghrib, Isha."
      : "e.g: Jummah, Taraweh, Eid ul Fitr etc.";
  const iconClassName = `salah-icon ${isSelected ? "selected" : ""}`;

  return (
    <div
      className={`salah-option ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(type)}
    >
      <span className={iconClassName}>
        <img src={salahClockIcon} alt="" />
      </span>
      <div className="salah_text">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

type SalahTimingsProps = {
  consumerMasjidId: string;
};

const SalahTimings: React.FC<SalahTimingsProps> = ({ consumerMasjidId }) => {
  const navigation = useNavigationprop();
  const [selectedType, setSelectedType] = useState<SalahType>(null);

  const handleSelectType = (type: SalahType) => {
    setSelectedType(type);
  };

  return (
    <>
      {!selectedType && (
        <>
          <div className="salah_header">
            <div className="goback" style={{ marginTop: "0" }}>
              <BackButton
                handleBackBtn={navigation ? navigation : customNavigatorTo}
              />
            </div>
            <h3 className="page-title" style={{ color: "#3D5347" }}>
              Salah Timings
            </h3>
            <p></p>
          </div>

          <div className="salah_main_container">
            <div className="salahcontainer">
              <SalahOption
                type="regular"
                isSelected={selectedType === "regular"}
                onClick={handleSelectType}
              />
              <SalahOption
                type="other"
                isSelected={selectedType === "other"}
                onClick={handleSelectType}
              />
            </div>
          </div>
        </>
      )}
      {/* Conditionally render the selected component */}
      {selectedType === "regular" && (
        <MobileViewCalender
          consumerMasjidId={consumerMasjidId}
          setSelectedType={setSelectedType}
        />
      )}
      {selectedType === "other" && (
        <OtherSalahMain
          consumerMasjidId={consumerMasjidId}
          setSelectedType={setSelectedType}
        />
      )}
    </>
  );
};

export default SalahTimings;
