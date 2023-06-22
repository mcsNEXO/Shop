import React, { createContext, useState, useEffect } from "react";

export const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discountContext, setDiscount] = useState({ name: "", value: 0 });

  useEffect(() => {
    const localDiscount = localStorage.getItem("discount");
    if (localDiscount) {
      setDiscountContext(JSON.parse(localDiscount));
    }
  }, []);

  const setDiscountContext = (code) => {
    setDiscount(code);
    localStorage.setItem("discount", JSON.stringify(code));
  };

  const value = {
    discountContext,
    setDiscountContext,
  };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscountContext = () => React.useContext(DiscountContext);
