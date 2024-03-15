import React, { useState } from "react";
import "./MasjidProfile.css";
import MasjidProfileCard from "../../../../../components/MasjidProfileMainComponent/MazjidProfileMainConponent";
import EditProfileComponent from "../../../../../components/EditProfileComponents/EditMasjidProfileComponent/EditProfileComponent";

const MasjidProfile = () => {
  const [EditMasjid, setEditMasjid] = useState(false);
 

  return (
    <div className="MasjidProfileContainer">
      {EditMasjid ? (
        <EditProfileComponent setEditMasjid={setEditMasjid} />
      ) : (
        <>
          <MasjidProfileCard setEditMasjid={setEditMasjid} />
        </>
      )}
    </div>
  );
};

export default MasjidProfile;
