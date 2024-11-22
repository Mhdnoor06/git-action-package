import React, { useState, useEffect } from "react";
import {
  Chip,
  ChipProps,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/system";
import { Cancel, AddCircleOutline } from "@mui/icons-material";
import CommonFields from "../CommonFileds/CommonFields";

interface FinancialAssistanceFieldsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValidationErrors: (errors: { [key: string]: string }) => void;
  stripeFields: [boolean, boolean];
  admin: any;
}

const FinancialAssistanceFields: React.FC<FinancialAssistanceFieldsProps> = ({
  formData,
  handleChange,
  setValidationErrors,
  stripeFields,
  admin,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [assistanceType, setAssistanceType] = useState("");
  const [assistanceTypes, setAssistanceTypes] = useState<string[]>(
    formData.assistanceTypes || []
  );

  const handleAddAssistanceType = () => {
    if (assistanceType.trim() !== "") {
      const updatedAssistanceTypes = [
        ...assistanceTypes,
        assistanceType.trim(),
      ];
      setAssistanceTypes(updatedAssistanceTypes);
      handleChange({
        target: {
          name: "assistanceTypes",
          value: updatedAssistanceTypes,
        },
      });
      setAssistanceType("");
    }
  };

  const handleDeleteAssistanceType = (typeToDelete: string) => () => {
    const updatedAssistanceTypes = assistanceTypes.filter(
      (type) => type !== typeToDelete
    );
    setAssistanceTypes(updatedAssistanceTypes);
    handleChange({
      target: {
        name: "assistanceTypes",
        value: updatedAssistanceTypes,
      },
    });
  };

  const handleAddCustomOption = (index) => {
    const tempOption = questions[index].tempOption;
    if (tempOption && !questions[index].customOptions.includes(tempOption)) {
      const updatedQuestions = questions.map((q, idx) =>
        idx === index
          ? {
              ...q,
              customOptions: [...(q.customOptions || []), tempOption],
              tempOption: "", // Clear the tempOption after adding
            }
          : q
      );
      setQuestions(updatedQuestions);
      handleChange({
        target: {
          name: "questions",
          value: updatedQuestions,
        },
      });
    }
  };

  const handleTempOptionChange = (index, value) => {
    const updatedQuestions = questions.map((q, idx) =>
      idx === index ? { ...q, tempOption: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleDeleteCustomOption = (index, option) => {
    const updatedQuestions = questions.map((q, idx) =>
      idx === index
        ? {
            ...q,
            customOptions: q.customOptions.filter((o) => o !== option),
          }
        : q
    );
    setQuestions(updatedQuestions);
    handleChange({
      target: {
        name: "questions",
        value: updatedQuestions,
      },
    });
  };

  const [questions, setQuestions] = useState<
    {
      question: string;
      responseType: string;
      isCustom?: boolean;
      customOptions?: string[];
    }[]
  >(formData.questions || []);

  const predefinedQuestions = [
    "No. Of Household",
    "Household Income",
    "Assistance Organization",
    "Your Current Situation",
    "Job",
    "Current Address",
  ];

  const responseTypes = ["Text", "Numeric", "Yes/No"];

  useEffect(() => {
    if (!formData.assistanceTypes) {
      handleChange({
        target: {
          name: "assistanceTypes",
          value: [],
        },
      });
    }
    if (!formData.questions) {
      handleChange({
        target: {
          name: "questions",
          value: [],
        },
      });
    }
  }, [formData]);

  const handleAddQuestion = (newQuestion: string, responseType: string) => {
    if (
      questions.length < 10 &&
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
          name: "questions",
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
        name: "questions",
        value: updatedQuestions,
      },
    });
  };

  const handleResponseTypeChange = (index, value) => {
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
        name: "questions",
        value: updatedQuestions,
      },
    });
  };

  const CustomChip = styled(Chip)<ChipProps & { selected?: boolean }>(
    ({ theme, selected }) => ({
      backgroundColor: selected ? "#BAFFE8" : "#ddd",
      fontSize: "0.85rem",
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

  return (
    <>
      <CommonFields
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
      <div className="form-group">
        <Typography
          variant="body1"
          sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
        >
          What kind of assistance are you Providing?{" "}
          <span style={{ color: "red" }}>* </span>
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} my={1}>
          {assistanceTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              onDelete={handleDeleteAssistanceType(type)}
              deleteIcon={
                <Cancel
                  sx={{
                    width: 20,
                    height: 15,
                  }}
                />
              }
              sx={{
                marginTop: "10px",
                color: "black",
                background: "#BAFFE8",
                "& .MuiChip-deleteIcon": {
                  color: "black",
                },
              }}
            />
          ))}
        </Box>
        <Box
          sx={{ position: "relative", display: "inline-block", width: "100%" }}
        >
          <input
            type="text"
            id="assistanceType"
            name="assistanceType"
            value={assistanceType}
            onChange={(e) => setAssistanceType(e.target.value)}
            placeholder="Add Assistance Type"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px", // Adjust padding for space for the button
              borderRadius: "25px",
              border: "1px solid #ccc",
            }}
          />
          <IconButton
            color="primary"
            className="custom-qsn-add-btn"
            onClick={handleAddAssistanceType}
          >
            <AddCircleOutline style={{ width: "100%", height: "100%" }} />
          </IconButton>
        </Box>
      </div>
      <div className="form-group">
        <Typography
          variant="body1"
          sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
        >
          Add Screening Questions
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "10px" }}
        >
          Note: You can add maximum 10 questions
        </Typography>
        <Box my={2}>
          {questions.map((q, index) => (
            <Box key={q.question} mb={2} position="relative">
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                {index + 1}. {q.question}
              </Typography>
              {q.isCustom && (
                <IconButton
                  color="default"
                  onClick={handleDeleteQuestion(q.question)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    transform: "translateY(-50%)",
                    padding: 0,
                    width: "30px",
                    height: "30px",
                  }}
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
                variant="body1"
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
                  // marginTop: "10px",
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
              {q.responseType === "Custom" && (
                <>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {q.customOptions &&
                      q.customOptions.map((option, idx) => (
                        <Chip
                          key={idx}
                          label={option}
                          onDelete={() =>
                            handleDeleteCustomOption(index, option)
                          }
                          sx={{
                            marginTop: "10px",
                            color: "black",
                            background: "#BAFFE8",
                            "& .MuiChip-deleteIcon": {
                              color: "black",
                            },
                          }}
                        />
                      ))}
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                      my: 2,
                    }}
                  >
                    <input
                      type="text"
                      value={q.tempOption || ""}
                      onChange={(e) =>
                        handleTempOptionChange(index, e.target.value)
                      }
                      placeholder="Add option"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 10px",
                        borderRadius: "25px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <IconButton
                      onClick={() => handleAddCustomOption(index)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: 0,
                        width: "30px",
                        height: "30px",
                      }}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
        {showCustomInput && (
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              my: 2,
            }}
          >
            <input
              type="text"
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
                color="primary"
                onClick={() =>
                  handleAddQuestion(customQuestion, responseTypes[0])
                }
                className=" custom-qsn-add-btn"
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
          {predefinedQuestions.map((predefinedQuestion) => {
            const isSelected = questions.some(
              (q) => q.question === predefinedQuestion
            );
            return (
              <CustomChip
                key={predefinedQuestion}
                label={predefinedQuestion}
                selected={isSelected}
                icon={
                  !isSelected ? (
                    <AddCircleOutline
                      sx={{
                        color: "black !important",
                        width: "15px",
                      }}
                    />
                  ) : undefined
                }
                onClick={() =>
                  !isSelected &&
                  handleAddQuestion(predefinedQuestion, responseTypes[0])
                }
                onDelete={
                  isSelected
                    ? handleDeleteQuestion(predefinedQuestion)
                    : undefined
                }
                deleteIcon={
                  isSelected ? (
                    <Cancel
                      sx={{
                        width: 20,
                        height: 15,
                      }}
                    />
                  ) : undefined
                }
                variant="outlined"
              />
            );
          })}
          <CustomChip
            label="Custom Question"
            onClick={() => setShowCustomInput(true)}
            variant="outlined"
            color="primary"
          />
        </Box>
      </div>
    </>
  );
};

export default FinancialAssistanceFields;
