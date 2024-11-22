import { AdminInterFace, User, UserActionType } from "../../Types";
import {
  AUTH_LOGIN,
  MASJID_ID_REMOVER,
  MASJID_ID_SETTER,
  MASJID_STATE_UNMOUNT,
} from "../../actiontype";

// eslint-disable-next-line import/no-anonymous-default-export
const initialUser = {
  autoPrefillingTiming: false,
  email: "",
  isVerified: false,
  masjids: [],
  name: "",
  role: "",
  _id: "",
};

const LoginReducer = (state: User = initialUser, action: UserActionType) => {
  switch (action.type) {
    case AUTH_LOGIN:
      localStorage.setItem("admin", JSON.stringify(action.payload));
      return action.payload;
    case MASJID_ID_SETTER:
      const updatedAdmin = { ...state, ...action.payload };
      console.log("id form userWithMasjidId ", updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      return updatedAdmin;
    case MASJID_ID_REMOVER:
      const updatedAdminWithoutMasjids = { ...state, masjids: [] };
      localStorage.setItem("admin", JSON.stringify(updatedAdminWithoutMasjids));
      console.log("updatedAdminWithoutMasjids => ", updatedAdminWithoutMasjids);
      return updatedAdminWithoutMasjids;
    case MASJID_STATE_UNMOUNT:
      return initialUser;

    default:
      const adminString = localStorage.getItem("admin");
      const parsedAdmin: AdminInterFace | null = adminString
        ? JSON.parse(adminString)
        : null;
      return parsedAdmin?.email ? parsedAdmin : state;
  }
};

export default LoginReducer;
