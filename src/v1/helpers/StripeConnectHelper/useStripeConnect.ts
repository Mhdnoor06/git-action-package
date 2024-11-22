import axios from "axios";
import { AuthTokens } from "../../redux/Types";
import { useState } from "react";
import { getRestAPIRootDomain } from "../ApiSetter/GraphQlApiSetter";
import toast from "react-hot-toast";

const useStripeConnect = (handleUnexpectedError: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const BaseRestUrl = getRestAPIRootDomain();

  const stripeConnect = async (email, otp, showErrors) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    let url = `${BaseRestUrl}/stripe/connect`;
    url += otp ? `?otp=${otp}` : "";
    url += email ? (otp ? `&email=${email}` : `?email=${email}`) : "";

    try {
      const authTokensString = localStorage.getItem("authTokens");
      const token: AuthTokens | null = authTokensString
        ? JSON.parse(authTokensString)
        : null;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });

      setResponseData(response.data); // Set the response data here
      return {
        success: response.status === 200 || response.status === 202,
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Handle 500, 401, and default errors in the hook itself
        if (status === 500) {
          handleUnexpectedError();
          if (showErrors) toast.error("Internal server error");
        } else if (status === 401) {
          handleUnexpectedError();
          if (showErrors)
            toast.error("You are not authorized to perform this action");
        } else if (status !== 400) {
          handleUnexpectedError();
          if (showErrors) toast.error("An unexpected error occurred");
          console.error("Error:", error.message);
        }

        // Return the error status to the component, only for handling 400
        return {
          success: false,
          status: status,
          error: error.message,
        };
      } else {
        setError(error.message);
        return {
          success: false,
          status: null,
          error: error.message,
        };
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { stripeConnect, isLoading, error, responseData };
};
export default useStripeConnect;
