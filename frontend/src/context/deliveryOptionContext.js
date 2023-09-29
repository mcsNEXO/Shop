import React, { useEffect } from "react";
export const DeliveryOptionContext = React.createContext();

export const DeliveryProvider = ({ children }) => {
  const [deliveryOption, setUserDeliveryOption] = React.useState();

  useEffect(() => {
    const localDeliveryOption = localStorage.getItem("deliveryOption");
    console.log(localDeliveryOption);
    localDeliveryOption &&
      setUserDeliveryOption(JSON.parse(localDeliveryOption));
  }, []);

  const setDeliveryOption = (deliveryData) => {
    localStorage.setItem("deliveryOption", JSON.stringify(deliveryData));
    setUserDeliveryOption(deliveryData);
  };
  const value = {
    deliveryOption,
    setDeliveryOption,
  };

  return (
    <DeliveryOptionContext.Provider value={value}>
      {children}
    </DeliveryOptionContext.Provider>
  );
};

export const useDeliveryOption = () => React.useContext(DeliveryOptionContext);
