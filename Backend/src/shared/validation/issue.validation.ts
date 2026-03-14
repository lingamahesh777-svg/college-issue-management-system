export const validateCreateIssue = (payload: any) => {
  if (
    !payload.name ||
    !payload.rollNo ||
    !payload.phoneNo ||
    !payload.issuePlace ||
    !payload.description
  ) {
    return {
      isValid: false,
      message: "Required fields are missing",
    };
  }

  return { isValid: true };
};
