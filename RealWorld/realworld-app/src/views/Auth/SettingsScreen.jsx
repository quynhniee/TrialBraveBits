import React, { useContext, useState } from "react";
import { AuthContext } from "../../app/auth";
import { useNavigate } from "react-router-dom";
import Errors from "../../components/Errors";
import { updateUser } from "../../features/auth";

const SettingsForm = ({ currentUser, onSaveSettings }) => {
  const [image, setImage] = useState(
    currentUser?.image ??
      "https://static.productionready.io/images/smiley-cyrus.jpg"
  );
  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [bio, setBio] = useState(currentUser?.bio ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [password, setPassword] = useState("");

  const changeImage = (event) => {
    setImage(event.target.value);
  };
  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeBio = (event) => {
    setBio(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const saveSettings = (event) => {
    event.preventDefault();

    const user = {
      image,
      username,
      bio,
      email,
    };

    if (password) {
      user.password = password;
    }

    onSaveSettings(user);
  };

  return (
    <form onSubmit={saveSettings}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            name="image"
            value={image}
            onChange={changeImage}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={changeUsername}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            name="bio"
            value={bio}
            onChange={changeBio}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            autoComplete="current-email"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={changeEmail}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            autoComplete="current-password"
            placeholder="New Password"
            name="password"
            value={password}
            onChange={changePassword}
          />
        </fieldset>

        <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};

const SettingsScreen = () => {
  const { currentUser, isAuth, setIsAuth, setCurrentUser } =
    useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const rejected = (errors) => {
    setErrors(errors);
  };

  const pending = (token, user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    navigate(`/user/${user.username}`);
  };

  const saveSettings = (user) => {
    updateUser({ user }, rejected, pending);
  };

  const logoutUser = () => {
    setIsAuth();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (!isAuth) navigate("/");
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <Errors errors={errors} />

            <SettingsForm
              currentUser={currentUser}
              onSaveSettings={saveSettings}
            />

            <hr />

            <button className="btn btn-outline-danger" onClick={logoutUser}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
