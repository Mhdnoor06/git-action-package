import React from "react";
import BackButton from "../../../Shared/BackButton";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";

interface DonorInvoiceProps {
  handleToggleShowDetails: (val: any) => void;
}
const DonationInvoice = ({ handleToggleShowDetails }: DonorInvoiceProps) => {
  return (
    <>
      <div className="donationTopbar">
        <div className="topbarflex">
          <div className="goback">
            <BackButton handleBackBtn={handleToggleShowDetails} />
          </div>
          <h3 className="page-title">Donor Invoice</h3>
        </div>
      </div>
      <Card
        sx={{
          // boxShadow: "none",
          // background: "transparent",
          //   maxWidth: 400,
          margin: "0 auto",
          padding: 0,
          borderRadius: 4,
        }}
      >
        <CardContent
          sx={{
            padding: 0,
            // background: "white",
            // borderRadius: "22px 22px 0px 0px",
            // boxShadow:
            //   "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Grid container spacing={1} mt={2} padding={3}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Donation Amount
              </Typography>
            </Grid>

            <Grid item container xs={12} gap={2}>
              <Grid item>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Lato",
                    color: "#3d5347",
                  }}
                >
                  $20.00
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#3d5347",
                    // lineHeight: "2",
                    fontFamily: "Lato",
                  }}
                  variant="h6"
                >
                  One Time
                </Typography>
              </Grid>
              {/* <Grid item xs={2}>
                    <Typography
                      variant="h4"
                      component="div"
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontFamily: "Lato",
                        color: "#3d5347",
                      }}
                    >
                      $20.00
                    </Typography>
                  </Grid>

                  <Grid item xs={10}>
                    <Typography
                      variant="h5"
                      component="div"
                      align="center"
                      sx={{
                        fontWeight: "400",
                        color: "#3d5347",
                        lineHeight: "2",
                        fontFamily: "Lato",
                      }}
                    >
                      One Time
                    </Typography>
                  </Grid> */}
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Name
              </Typography>
              <Typography variant="body1" className="invoice-field-bold">
                Mustufa Arif
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Email
              </Typography>
              <Typography variant="body1" className="invoice-field-bold">
                mustufa@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Date & Time
              </Typography>
              <Typography variant="body1" className="invoice-field-bold">
                12 July 2024 | 09:00 PM
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Contact Number
              </Typography>
              <Typography variant="body1" className="invoice-field-bold">
                +1 78356 37876
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Donation for
              </Typography>
              <Typography variant="body1" className="invoice-field-bold">
                Zakat
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Message
              </Typography>
              <Typography variant="body1" className="invoice-field-bold">
                You Are Doing Good Work......
              </Typography>
            </Grid>
          </Grid>

          {/* <Divider sx={{ my: 2 }} /> */}
        </CardContent>
        <Typography
          variant="body1"
          align="center"
          sx={{
            fontWeight: "500",
            color: "#2E382E",
            background: "#C1E6D3",
          }}
        >
          Invoice Details
        </Typography>
        <CardContent
          sx={{
            padding: 0,
            // background: "white",
            // boxShadow:
            //   "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Grid
            container
            spacing={1}
            mt={2}
            padding={3}
            sx={{ marginTop: "4px" }}
          >
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Invoice Date
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ textAlign: "right", color: "#3d5347" }}
                variant="body1"
                className="invoice-field-bold"
              >
                12 July 2024
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Invoice ID
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ textAlign: "right", color: "#3d5347" }}
                variant="body1"
                className="invoice-field-bold"
              >
                #CM0001
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Total Paid
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ textAlign: "right", color: "#3d5347" }}
                variant="body1"
                className="invoice-field-bold"
              >
                $20.00
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Payment Gateway Fee
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ textAlign: "right", color: "#3d5347" }}
                variant="body1"
                className="invoice-field-bold"
              >
                - $1.00
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="invoice-field-normal"
              >
                Connect Mazjid Platform Fee
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ textAlign: "right", color: "#3d5347" }}
                variant="body1"
                className="invoice-field-bold"
              >
                - $1.00
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* <Box> */}
          <Grid container xs={12} paddingX={3}>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#3d5347",
                  lineHeight: "2.5",
                }}
              >
                Total Received
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#3d5347",
                  textAlign: "right",
                }}
              >
                $18.00
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#2E7D32" }}
                >
                  Total Received
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#2E7D32" }}
                >
                  $18.00
                </Typography> */}
          {/* </Box> */}
        </CardContent>
      </Card>
    </>
  );
};

export default DonationInvoice;
