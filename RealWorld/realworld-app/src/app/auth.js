import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: Boolean,
  currentUser: {},
});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
