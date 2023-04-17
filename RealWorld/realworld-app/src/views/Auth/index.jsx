import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errors from "../../components/Errors";
import api from "../../api";
import { login, register } from "../../features/auth";
import { AuthContext } from "../../app/auth";
import Context from "../../app/context";

const AuthScreen = ({ isRegister }) => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const { setCurrentUser } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const rejected = (data) => setErrors(data);
  const pending = (token, user) => {
    api.Auth.setHeader(token);
    setCurrentUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuth(true);
    navigate("/");
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (isRegister) {
      // api.Auth.register(username, email, password)
      //   .then((response) => response.data)
      //   .then((data) => {
      //     setErrors(data.errors ?? []);
      //   });
      await register({ username, email, password }, rejected, pending);
    } else {
      // api.Auth.login(email, password)
      //   .then((response) => response.data)
      //   .then((data) => {
      //     setErrors(data.errors ?? []);
      //   });
      await login({ email, password }, rejected, pending);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              {isRegister ? "Sign Up" : "Sign In"}
            </h1>
            <p className="text-xs-center">
              {isRegister ? (
                <Link to="/login">Have an account?</Link>
              ) : (
                <Link to="/register">Need an account?</Link>
              )}
            </p>

            <Errors errors={errors} />

            <form onSubmit={submitHandle}>
              {isRegister ? (
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    name="username"
                    value={username}
                    onChange={changeUsername}
                  />
                </fieldset>
              ) : null}

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={changeEmail}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={changePassword}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                {isRegister ? "Sign up" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
