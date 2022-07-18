import React from "react";

const AuthContext = React.createContext({
  isAuthentiacted: false,
  login: () => {},
  logout: () => {},
});

AuthContext.displayName = "AuthContext";

export default AuthContext;
