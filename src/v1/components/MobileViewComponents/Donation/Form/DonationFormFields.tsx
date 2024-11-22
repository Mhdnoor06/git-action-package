import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
interface DonationFormFields {
  setFormData: Dispatch<SetStateAction<FormData>>;
  formData: any;
}
export interface FormData {
  donationPurpose: string;
  description: string;
  defaultAmounts: number[];
  [key: string]: string | number | null | number[];
}
const DonationFormFields = ({ setFormData, formData }: DonationFormFields) => {
  return (
    
  );
};

export default DonationFormFields;
