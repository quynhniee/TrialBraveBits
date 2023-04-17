import { Suspense, lazy, useContext, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import { AuthContext } from "./app/auth";
import api from "./api";

const AuthScreen = lazy(() => import("./views/Auth"));
const Article = lazy(() => import("./views/Article"));
const Profile = lazy(() => import("./views/Profile"));

function App() {
  const { setIsAuth, setCurrentUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (token && !isExpired) {
      setIsAuth(true);
      setCurrentUser(user);
      api.Auth.setHeader(token);
    } else {
      setIsAuth(undefined);
    }
  }, [isExpired, setCurrentUser, setIsAuth, token, user]);

  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/register" element={<AuthScreen isRegister />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route
            path="/user/:username/favorites"
            element={<Profile isFavoritePage />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
