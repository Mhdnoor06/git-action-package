import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Dashboard.css";
import image from "../../photos/LogoMain.png";
// import { FetchingLatestUpdatedEventsById } from "../../redux/actions/EventActions/FetchingLastestUpdatedEventsAction";
// import { FetchingAnnouncementNotification } from "../../redux/actions/AnnouncementActions/FetchingAnnouncementAction";
// import { fetchMasjidById } from "../../redux/actions/MasjidActions/fetchMasjidById";

//imports for Desktop
import Sidebar from "../../components/ArchitectureCompoenents/SidebarComponent/Sidebar";
import TopBar from "../../components/ArchitectureCompoenents/TopbarComponent/TopBar";
const LandingFeedPage = lazy(
  () => import("./FeedPages/LandingFeedPages/LandingFeedPage")
);
const AdminProfile = lazy(
  () => import("./FeedPages/ProfileSectionPages/AdminProfile/AdminProfile")
);
const MasjidProfile = lazy(
  () => import("./FeedPages/ProfileSectionPages/MasjidProfile/MasjidProfile")
);
const MasjidAnnouncementPage = lazy(
  () =>
    import(
      "./FeedPages/MasjidSectionPages/MasjidAnnouncementpage/MasjidAnnouncementPage"
    )
);
const MasjidEventsPage = lazy(
  () =>
    import("./FeedPages/MasjidSectionPages/MasjidEventsPage/MasjidEventsPage")
);
const EventProfile = lazy(
  () => import("./FeedPages/ProfileSectionPages/EventProfile/EventProfile")
);
const MasjidTimings = lazy(
  () => import("./FeedPages/MasjidSectionPages/MasjidTimingsPage/MasjidTimings")
);
const MasjidUploadTimings = lazy(
  () =>
    import(
      "./FeedPages/MasjidSectionPages/MasjidUploadTimingsPage/MasjidUploadTimings"
    )
);

//imports for mobile and tablet view

import MobileViewCalender from "../../components/MobileViewComponents/MobileViewCalender/MobileViewCalender";
import SpecialPrayersComponent from "../../components/MobileViewComponents/SpecialPrayersComponent/SpecialPrayersComponent";
import EventsViewCalender from "../../components/MobileViewComponents/EventsComponent/EventsViewCalender/EventsViewCalender";
import Events from "../../components/MobileViewComponents/EventsComponent/Events";
import EventDetails from "../../components/MobileViewComponents/EventDetails/EventDetails";
import ProtectedRoute from "../Authpages/ProtectedRoute/ProtectedRoute";
import BottomNavigation from "../../components/MobileViewComponents/BottomNavigation/BottomNavigation";

import { fetchAdminDetails } from "../../redux/actions/AuthActions/fetchAdminDetails";
import { useAppThunkDispatch } from "../../redux/hooks";
import { AdminInterFace } from "../../redux/Types";

const Dashboard = () => {
  const dispatch = useAppThunkDispatch();
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  useEffect(() => {
    if (admin) {
      // let limit = 4;
      // const res = dispatch(FetchingLatestUpdatedEventsById(admin._id, limit));
      // res.then((result) => {
      //   if (!result.success) {
      //     handleSnackbar(
      //       true,
      //       "error",
      //       `Failed To Fetch:Something Went Wrong`,
      //       dispatch
      //     );
      //   }
      // });

      // const announcements = dispatch(FetchingAnnouncementNotification( limit,'1','createdAt'));
      // announcements.then((result) => {
      //   if (!result.success) {
      //     handleSnackbar(
      //       true,
      //       "error",
      //       `Failed To Fetch:Something Went Wrong`,
      //       dispatch
      //     );
      //   }
      // });

      const AdminResponse = dispatch(fetchAdminDetails());
      AdminResponse.then((result) => {
        console.log(result.message);
        if (!(result.message === "Success")) {
          localStorage.removeItem("authTokens");
          localStorage.removeItem("admin");
          window.location.reload();
        }
      });
    }
  }, []);

  //Mobile View Check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* for mobile screen */}
      {/* {isMobile ? ( */}
      <>
        {
          <Routes>
            <Route
              path="/mobileCalender"
              element={<ProtectedRoute component={<MobileViewCalender />} />}
            />
            <Route
              path="/feed/:tab"
              element={<ProtectedRoute component={<BottomNavigation />} />}
            />
            <Route
              path="/events-calender"
              element={<ProtectedRoute component={<EventsViewCalender />} />}
            />
            <Route
              path="/event/:id"
              element={<ProtectedRoute component={<Events />} />}
            />
            <Route
              path="/event-details/:id"
              element={<ProtectedRoute component={<EventDetails />} />}
            />
            <Route
              path="/special-prayers"
              element={
                <ProtectedRoute component={<SpecialPrayersComponent />} />
              }
            />
          </Routes>
        }
      </>
      {/* ) : (
        //for desktop screen

        <Suspense fallback={<div>Loading...</div>}>
          <div className="HeadDashboardContainer">
            <div className="DashboardTopbarContainer">
              <TopBar />
            </div>
            <div className="DashboardFeedContainer">
              <div className="DashboardSidebarContainer">
                <div className="LogoSideBarContainer">
                  <Link to="/1" style={{ textDecoration: "none" }}>
                    <img
                      src={image}
                      alt="whats worng"
                      className="minarTopImage"
                    />
                  </Link>
                </div>
                <div className="SidebarBottom">
                  <Sidebar />
                </div>
              </div>
              <div className="DashboardFeedSubContainer">
                <Routes>
                  <Route
                    path="/feed"
                    element={
                      admin && admin.isVerified ? (
                        <LandingFeedPage />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/adminprofile"
                    element={
                      admin && admin.isVerified ? (
                        <AdminProfile />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/masjidprofile"
                    element={
                      admin && admin.isVerified ? (
                        <MasjidProfile />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/eventprofile/:id"
                    element={
                      admin && admin.isVerified ? (
                        <EventProfile />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/events"
                    element={
                      admin && admin.isVerified ? (
                        <MasjidEventsPage />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/masjidtimings"
                    element={
                      admin && admin.isVerified ? (
                        <MasjidTimings />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/masjidtimingsupload"
                    element={
                      admin && admin.isVerified ? (
                        <MasjidUploadTimings />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/announcements"
                    element={
                      admin && admin.isVerified ? (
                        <MasjidAnnouncementPage />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/mobileCalender"
                    element={
                      admin && admin.isVerified ? (
                        <MobileViewCalender />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/events-calender"
                    element={
                      admin && admin.isVerified ? (
                        <MobileViewCalender />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </Suspense>
      )} */}
    </>
  );
};

export default Dashboard;
