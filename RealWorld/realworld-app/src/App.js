import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";

const AuthScreen = lazy(() => import("./views/Auth"));
const Article = lazy(() => import("./views/Article"));
const Profile = lazy(() => import("./views/Profile"));

function App() {
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
