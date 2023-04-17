import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: Boolean,
  setIsAuth: () => {},
  isAuthor: () => {},
  currentUser: {},
  setCurrentUser: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const isAuthor = (author) => {
    if (isAuth !== true) return false;
    return author.username === currentUser.username;
  };
  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, currentUser, setCurrentUser, isAuthor }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
