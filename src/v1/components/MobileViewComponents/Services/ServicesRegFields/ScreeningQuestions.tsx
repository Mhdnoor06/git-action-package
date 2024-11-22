import React, { useState, useEffect } from "react";
import {
  Chip,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Select,
  OutlinedInput,
  ChipProps,
} from "@mui/material";
import { styled } from "@mui/system";
import { Cancel, AddCircleOutline } from "@mui/icons-material";

export interface ScreeningQuestionsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValidationErrors: (errors: { [key: string]: string }) => void;
}

const ScreeningQuestions: React.FC<ScreeningQuestionsProps> = ({
  formData,
  handleChange,
  setValidationErrors,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [questions, setQuestions] = useState<
    {
      question: string;
      responseType: string;
      isCustom?: boolean;
      customOptions?: string[];
    }[]
  >(formData?.consultationQuestions || []);
  const responseTypes = ["Text", "Numeric", "Yes/No"];

  useEffect(() => {
    if (!formData.consultationQuestions) {
      handleChange({
        target: {
          name: "consultationQuestions",
          value: [],
        },
      });
    }
  }, [formData.consultationQuestions]);

  const handleAddQuestion = (newQuestion: string, responseType: string) => {
    if (
      questions.length < 20 &&
      newQuestion.trim() !== "" &&
      !questions.some((q) => q.question === newQuestion)
    ) {
      const updatedQuestions = [
        ...questions,
        {
          question: newQuestion.trim(),
          responseType,
          isCustom: showCustomInput,
        },
      ];
      setQuestions(updatedQuestions);
      handleChange({
        target: {
          name: "consultationQuestions",
          value: updatedQuestions,
        },
      });
      setCustomQuestion("");
      setShowCustomInput(false);
    }
  };

  const handleDeleteQuestion = (questionToDelete: string) => () => {
    const updatedQuestions = questions.filter(
      (q) => q.question !== questionToDelete
    );
    setQuestions(updatedQuestions);
    handleChange({
      target: {
        name: "consultationQuestions",
        value: updatedQuestions,
      },
    });
  };

  const handleResponseTypeChange = (index: any, value: any) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index
        ? {
            ...q,
            responseType: value,
            customOptions: value === "Custom" ? q.customOptions || [] : [],
            tempOption: value === "Custom" ? q.tempOption || "" : "",
          }
        : q
    );
    setQuestions(updatedQuestions);
    handleChange({
      target: {
        name: "consultationQuestions",
        value: updatedQuestions,
      },
    });
  };

  const CustomChip = styled(Chip)<ChipProps & { selected?: boolean }>(
    ({ theme, selected }) => ({
      backgroundColor: selected ? "#BAFFE8" : "#ddd",
      borderRadius: "25px",
      "& .MuiChip-deleteIcon": {
        color: "black",
      },
      border: "none",
      "&:hover": {
        color: selected ? "black" : "#1D2B2D",
      },
    })
  );

  // const CustomChip = styled(Chip)(({ theme, selected }) => ({
  //   backgroundColor: selected ? "#BAFFE8" : "#ddd",
  //   borderRadius: "25px",
  //   "& .MuiChip-deleteIcon": {
  //     color: "black",
  //   },
  //   border: "none",
  //   "&:hover": {
  //     color: selected ? "black" : "#1D2B2D",
  //   },
  // }));

  return (
    <div className="form-group">
      <Typography
        sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
      >
        Add Screening Questions
      </Typography>
      <Typography
        sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "10px" }}
      >
        Note: You can add maximum 20 questions
      </Typography>
      <Box my={2}>
        {questions.map((q, index) => (
          <Box key={q.question} mb={2} position="relative">
            <Typography sx={{ fontSize: "14px" }}>
              {index + 1}. {q.question}
            </Typography>
            {q.isCustom && (
              <IconButton
                color="default"
                onClick={handleDeleteQuestion(q.question)}
                className="custom-selected-qsn-cancel-btn"
              >
                <Cancel
                  sx={{
                    width: 20,
                    height: 15,
                  }}
                />
              </IconButton>
            )}
            <Typography
              sx={{
                color: "#2e2e2e",
                margin: "8px 10px 8px",
                fontSize: "12px",
              }}
            >
              Response Type
            </Typography>
            <Select
              value={q.responseType}
              onChange={(e) =>
                handleResponseTypeChange(index, e.target.value as string)
              }
              displayEmpty
              input={<OutlinedInput />}
              sx={{
                width: "100%",
                borderRadius: "20px",
                border: "1px solid #ccc",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2e2e2e",
                    borderRadius: "20px",
                  },
                },
                "& .MuiSelect-select": {
                  padding: "8px 14px",
                  fontSize: "14px",
                },
              }}
            >
              {responseTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
      </Box>
      {showCustomInput && (
        <Box
          className="custom-qsn-box"
          sx={{
            position: "relative",
            display: "inline-block",
            width: "100%",
            my: 2,
          }}
        >
          <input
            type="text"
            className="custom-qsn-input"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Enter your custom question here"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              borderRadius: "25px",
              border: "1px solid #ccc",
            }}
          />
          <IconButton
            color="default"
            onClick={() => {
              setCustomQuestion("");
              setShowCustomInput(false);
            }}
            className="custom-qsn-cancel-btn"
          >
            <Cancel
              sx={{
                width: 20,
                height: 15,
              }}
            />
          </IconButton>
          {customQuestion && (
            <IconButton
              className="custom-qsn-add-btn"
              color="primary"
              onClick={() =>
                handleAddQuestion(customQuestion, responseTypes[0])
              }
            >
              <AddCircleOutline
                sx={{
                  width: 20,
                  height: 15,
                }}
              />
            </IconButton>
          )}
        </Box>
      )}
      <Box display="flex" flexWrap="wrap" gap={1} my={1}>
        <CustomChip
          label="Custom Question"
          onClick={() => setShowCustomInput(true)}
          variant="outlined"
          color="primary"
          deleteIcon={
            <AddCircleOutline
              sx={{
                color: "black !important",
                width: "15px",
              }}
            />
          }
          onDelete={() => {}}
        />
      </Box>
    </div>
  );
};

export default ScreeningQuestions;
