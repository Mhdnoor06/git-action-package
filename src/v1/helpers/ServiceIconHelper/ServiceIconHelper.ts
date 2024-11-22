import medkitIcon from "../../photos/Newuiphotos/Services/medkit.webp";
import consultingIcon from "../../photos/Newuiphotos/Services/consulting.webp";
import funeralIcon from "../../photos/Newuiphotos/Services/funeral1.webp";
import nikahIcon from "../../photos/Newuiphotos/Services/nikah1.webp";
import financialIcon from "../../photos/Newuiphotos/Services/financial.webp";
export const getDonationDefaultIcon = (serviceType: string) => {
  switch (serviceType) {
    case "Nikah":
      return nikahIcon;
    case "Consultation":
      return consultingIcon;
    case "Funeral":
      return funeralIcon;
    case "Financial Assistance":
      return financialIcon;
    default:
      return medkitIcon;
  }
};
