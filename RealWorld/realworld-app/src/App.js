import { Suspense, lazy } from "react";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

const AuthScreen = lazy(() => import("./features/auth/AuthScreen"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/register" element={<AuthScreen isRegister />} />
          {/* <Route path="/editor/:slug" element={<Editor />} />
    <Route path="/editor" element={<Editor />} />
    <Route path="/article/:slug" element={<Article />} />
    <Route path="/settings" element={<SettingsScreen />} />
    <Route
      path="/@:username/favorites"
      element={<Profile isFavoritePage />}
    />
    <Route path="/@:username" element={<Profile />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
