import { AdminInterFace } from "../../redux/Types";

export const adminFromLocalStg = (): AdminInterFace => {
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace = adminString ? JSON.parse(adminString) : null;
  return admin;
};
