import { SignUpEmail } from "../../../ClientApi-Calls/index";

export const signUpEmail = (requestBody: any) => {
  return async () => {
    try {
      const response = await SignUpEmail(requestBody);
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      return { error: "An error occurred while signing up." };
    }
  };
};
