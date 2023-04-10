import React, { useState } from "react";
import { Link } from "react-router-dom";
import Errors from "../../components/Errors";

const AuthScreen = ({ isRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
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

            <Errors errors={[]} />

            <form>
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
                  type="text"
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
