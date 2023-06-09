import { Suspense, lazy, useContext, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthContext } from "./app/auth";
import api from "./api";

const Home = lazy(() => import("./views/Home"));
const AuthScreen = lazy(() => import("./views/Auth"));
const Article = lazy(() => import("./views/Article"));
const Profile = lazy(() => import("./views/Profile"));
const Editor = lazy(() => import("./views/Editor"));
const SettingsScreen = lazy(() => import("./views/Auth/SettingsScreen"));

function App() {
  const { setIsAuth, setCurrentUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (token && !isExpired) {
      setIsAuth(true);
      setCurrentUser(JSON.parse(user));
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
          <Route path="/settings" element={<SettingsScreen />} />
          <Route
            path="/user/:username/favorites"
            element={<Profile isFavoritePage />}
          />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
