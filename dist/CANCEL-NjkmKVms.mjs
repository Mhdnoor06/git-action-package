const A = "data:image/png;base64,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";
export {
  A as C
};