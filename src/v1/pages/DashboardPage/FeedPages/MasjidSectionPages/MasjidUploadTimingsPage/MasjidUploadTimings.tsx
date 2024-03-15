import React, { useState } from "react";
// import TimingsDisplayComponent from "../../../../../components/PagesComponents/TimingsPageComponents/TimingsDisplayComponent/TimingsDisplayComponent";
import "./MasjidUploadTimings.css";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";

const MasjidUploadTimings = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<any[]>([]);

  const readExcel = (file: File) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (e.target) {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: "buffer" });

          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws);

          resolve(data);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d: any) => {
      setItems(d);
    });
  };

  return (
    <>
      <div className="MasjidTimingsContainer">
        <div className="MasjidTimigsComponnet">
          <div className="MasjidTimingsTopComponent">
            {/* <div className="TimingLogoComponent">
              <button className="MasjidTimingsTitleLogoButton">
                UPLOAD TIMINGS
              </button>
            </div>
            <div className="MasjidTimingsPageCancelContainer">
              <MdCancel
                className="MasjidTimingsCancelIcon"
                onClick={(e) => {
                  navigate("/feed");
                }}
              />
            </div> */}
          </div>
          <div className="MasjidTimingsBottomComponent">
            <div>
              <table className="table-container">
                <thead className="table-head-component">
                  <tr className="tableHeadUpload">
                    <th className="tableHeaderPrayerNameUpload">
                      <span className="tableHeaderContentUpload">Date</span>
                    </th>
                    <th className="tableHeaderPrayerNameUpload">
                      <span className="tableHeaderContentUpload">Fajr</span>
                    </th>
                    <th className="tableHeaderPrayerNameUpload">
                      <span className="tableHeaderContentUpload">Dhur</span>
                    </th>
                    <th className="tableHeaderPrayerNameUpload">
                      <span className="tableHeaderContentUpload">Asar</span>
                    </th>
                    <th className="tableHeaderPrayerNameUpload">
                      <span className="tableHeaderContentUpload">Maghrib</span>
                    </th>
                    <th className="tableHeaderPrayerNameUpload">
                      <span className="tableHeaderContentUpload">Isha</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.slice(5, 30).map((item) => {
                    return (
                      <>
                        <tr key={item}>
                          <td className="tableRowUpload">
                            <span className="tableHeaderContentBodyNameUpload">
                              {item.Date}
                            </span>
                          </td>
                          <td className="tableRowUpload">
                            <span className="tableHeaderContentBodyNameUpload">
                              {item.Fajr}
                            </span>
                          </td>
                          <td className="tableRowUpload">
                            <span className="tableHeaderContentBodyNameUpload">
                              {item.Dhur}
                            </span>
                          </td>
                          <td className="tableRowUpload">
                            <span className="tableHeaderContentBodyNameUpload">
                              {item.Asar}
                            </span>
                          </td>
                          <td className="tableRowUpload">
                            <span className="tableHeaderContentBodyNameUpload">
                              {item.Maghrib}
                            </span>
                          </td>
                          <td className="tableRowUpload">
                            <span className="tableHeaderContentBodyNameUpload">
                              {item.Isha}
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="inputFieldButton">
            <input
              className="InputFildTimingsContainer"
              type="file"
              id="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  readExcel(e.target.files[0]);
                }
              }}
            />
            <label
              className="labelForUploadFile"
              // for="file"
            >
              Upload Pdf, Csv or Excel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasjidUploadTimings;
