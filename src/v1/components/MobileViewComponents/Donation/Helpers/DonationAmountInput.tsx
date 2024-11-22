import React, { ChangeEvent, FocusEvent, useRef, useEffect } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface DonationAmountInputProps {
  value: string;
  defaultValue?: string;
  index: number;
  onChange?: (index: number, value: string) => void;
  readOnly?: boolean;
  inputChecker?: (val: any, condition?: boolean) => void;
  validateAndFormatPrice?: (price: string, defaultPrice: string) => string;
}

const DonationAmountInput: React.FC<DonationAmountInputProps> = ({
  value,
  defaultValue = "00.00",
  index,
  onChange,
  readOnly,
  inputChecker,
  validateAndFormatPrice,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      // Update the span content to the input's value
      spanRef.current.textContent = value || defaultValue;

      // Set the input width based on the span width
      inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
    }
  }, [value, defaultValue]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (readOnly || !onChange || !validateAndFormatPrice) return;

    const inputValue = e.target.value.trim();
    const formattedValue = validateAndFormatPrice(inputValue, defaultValue);
    onChange(index, formattedValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (readOnly || !onChange) return;

    const inputValue = e.target.value;
    onChange(index, inputValue);
  };

  return (
    <div
      style={{
        border: "1px solid #065f46",
        borderRadius: "29px",
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <AttachMoneyIcon
        sx={{
          fontWeight: "100",
          bottom: "0",
          alignSelf: "center",
          marginLeft: "4px",
          width: "0.65em",
          height: "0.65em",
        }}
      />
      <input
        ref={inputRef}
        value={value}
        className={(inputChecker ? inputChecker(value) : "", "defaultAmount")}
        type="text"
        readOnly={readOnly}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{
          color: "#878787",
          border: "none",
          fontWeight: 500,
          margin: 0,
          marginRight: "10px",
          fontSize: "12px",
          padding: "10px 1px",
          borderRadius: "22px",
          width: "50px", // Initial width to prevent collapsing
        }}
      />
      {/* Hidden span used to calculate the width */}
      <span
        ref={spanRef}
        style={{
          visibility: "hidden",
          whiteSpace: "pre",
          position: "absolute",
          fontSize: "12px",
          fontWeight: 500,
          padding: "10px 1px",
        }}
      >
        {value || defaultValue}
      </span>
    </div>
  );
};

export default DonationAmountInput;
