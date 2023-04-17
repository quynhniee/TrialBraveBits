import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: Boolean,
  setIsAuth: () => {},
  currentUser: {},
  setCurrentUser: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();
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
