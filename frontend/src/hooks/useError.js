import { useContext } from "react";
import ErrorContext from "../context/errorContext";

export default function useCart() {
  const errorContext = useContext(ErrorContext);

  const error = errorContext.error;

  const setError = (error) => {
    if (error) {
      errorContext.setError(error);
      window.localStorage.setItem("error", JSON.stringify(error));
    } else {
      errorContext.setError(null);
      window.localStorage.setItem("error", null);
    }
  };

  return [error, setError];
}
