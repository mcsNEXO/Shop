import React from "react";

const AuthContext = React.createContext({
  user: false,
  login: () => {},
  logout: () => {},
});

AuthContext.displayName = "AuthContext";

export default AuthContext;
