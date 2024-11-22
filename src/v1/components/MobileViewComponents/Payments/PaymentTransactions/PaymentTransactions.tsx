import React, { useEffect, useState } from "react";
import {
  loadConnectAndInitialize,
  StripeConnectInstance,
} from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import { AuthTokens } from "../../../../redux/Types";
import "./PaymentTrasactions.css";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { getStripePublishableKey } from "../../../../helpers/StripeKeyProvider/StripeKeyProvider";
import toast from "react-hot-toast";
import { getRestAPIRootDomain } from "../../../../helpers/ApiSetter/GraphQlApiSetter";

const PaymentTransactions = () => {
  const [stripeInstance, setStripeInstance] = useState<StripeConnectInstance>();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true); // Main loading state
  const [paymentsLoading, setPaymentsLoading] = useState(true); // Loading state for payments

  const StripePublishableKey = getStripePublishableKey();

  useEffect(() => {
    const initializeStripe = async () => {
      if (!StripePublishableKey) {
        setIsError(true);
        setLoading(false);
        toast.error("Publishable key is missing.");
        return;
      }
      try {
        const stripe = loadConnectAndInitialize({
          publishableKey: StripePublishableKey,
          fetchClientSecret: fetchClientSecret,
        });
        setStripeInstance(stripe);
      } catch (error) {
        setIsError(true);
        toast.error("Something went wrong!");
        console.error("Failed to initialize Stripe:", error);
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    initializeStripe();
  }, []);

  const fetchClientSecret = async () => {
    const restApiUrl = getRestAPIRootDomain();
    const authTokensString = localStorage.getItem("authTokens");
    const token: AuthTokens | null = authTokensString
      ? JSON.parse(authTokensString)
      : null;

    const response = await fetch(restApiUrl + "/account/session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    });
    if (!response.ok) {
      const { error } = await response.json();
      console.error("An error occurred: ", error);
      return undefined;
    } else {
      const { client_secret: clientSecret } = await response.json();
      return clientSecret;
    }
  };

  const handlePaymentsLoaded = () => {
    setPaymentsLoading(false); // Call this function when payments are loaded
  };

  return (
    <Card
      className="PaymentTransactionCard"
      sx={{ padding: stripeInstance ? "10px" : "0px" }}
    >
      <div
        className="PaymentTransactions"
        style={{
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative", // Ensure position relative for absolute positioning
        }}
      >
        {loading ? ( // Show loader while loading
          <CircularProgress />
        ) : isError ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Something went wrong.
            </Typography>
            <Typography variant="body1">
              There was an error during authentication. You can still view your
              information in Stripe.
            </Typography>
          </Box>
        ) : stripeInstance ? (
          <ConnectComponentsProvider connectInstance={stripeInstance}>
            <div
              style={{
                display: paymentsLoading ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute", // Position absolute to center within the parent
                top: "50%", // Center vertically
                left: "50%", // Center horizontally
                transform: "translate(-50%, -50%)", // Adjust for centering
              }}
            >
              <CircularProgress />
            </div>
            <ConnectPayments onLoaderStart={handlePaymentsLoaded} />
          </ConnectComponentsProvider>
        ) : null}
      </div>
    </Card>
  );
};

export default PaymentTransactions;
