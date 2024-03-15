import { AdminInterFace, User, UserActionType } from "../../Types";
import { AUTH_LOGIN } from "../../actiontype";

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

const LoginReducer = (admin: User = initialUser, action: UserActionType) => {
  switch (action.type) {
    case AUTH_LOGIN:
      localStorage.setItem("admin", JSON.stringify(action.payload));
      return action.payload;

    default:
      const adminString = localStorage.getItem("admin");
      const parsedAdmin: AdminInterFace | null = adminString
        ? JSON.parse(adminString)
        : null;
      if (parsedAdmin?.email) return parsedAdmin;
      else return admin;
  }
};

export default LoginReducer;
