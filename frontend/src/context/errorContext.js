import React from "react";

const ErrorContext = React.createContext({
  error: "",
  setError: () => {},
});

ErrorContext.displayName = "ErrorContext";

export default ErrorContext;
