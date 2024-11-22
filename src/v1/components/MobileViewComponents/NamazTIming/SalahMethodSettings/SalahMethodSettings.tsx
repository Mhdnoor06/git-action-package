import React, { Dispatch, SetStateAction, useState } from "react";
import "./salah.css";
import salahClockIcon from "../../../../photos/Newuiphotos/salahpageicons/clockIcon.svg";
import { useNavigationprop } from "../../../../../MyProvider";
import BackButton from "../../Shared/BackButton";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import MobileViewCalender from "../../MobileViewCalender/MobileViewCalender";
import OtherSalahComponent from "../../OtherSalahComponents/OtherSalahComponent";

type SalahType = "regular" | "asr";

interface ChildComponentProps {
  selectedType: SalahType;
}

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
    type === "regular" ? "Salah  Calculation Method" : "Al-Asr Juristic Method";

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
      </div>
    </div>
  );
};

type SalahMethodSettingsProps = {
  children: React.ReactElement<ChildComponentProps>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
};

const SalahMethodSettings: React.FC<SalahMethodSettingsProps> = ({
  children,
  setIsSettingsOpen,
}) => {
  const [selectedType, setSelectedType] = useState<SalahType>();

  const handleSelectType = (type: SalahType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    if (selectedType) setSelectedType(null);
    else setIsSettingsOpen(false);
  };

  return (
    <>
      <>
        <div className="salah_method_header">
          <div className="goback" style={{ marginTop: "0" }}>
            <BackButton handleBackBtn={handleBack} />
          </div>
          <h3 className="page-title" style={{ color: "#3D5347" }}>
            Salah Settings
          </h3>
          <p></p>
        </div>
        {!selectedType && (
          <div className="salah_method_container">
            <div className="salahmethodcontainer">
              <SalahOption
                type="regular"
                isSelected={selectedType === "regular"}
                onClick={handleSelectType}
              />
              <SalahOption
                type="asr"
                isSelected={selectedType === "asr"}
                onClick={handleSelectType}
              />
            </div>
          </div>
        )}
      </>

      {selectedType &&
        React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { selectedType })
            : child
        )}
    </>
  );
};

export default SalahMethodSettings;
