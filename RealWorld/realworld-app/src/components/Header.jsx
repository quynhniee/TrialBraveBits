import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../app/context";
import { AuthContext } from "../app/auth";

const LoggedOutNavbar = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </ul>
  );
};

const LoggedInNavbar = () => {
  const { currentUser } = useContext(Context);
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/editor" className="nav-link">
          <i className="ion-compose" />
          &nbsp;New Post
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <i className="ion-gear-a" />
          &nbsp;Settings
        </Link>
      </li>

      <li className="nav-item">
        <Link to={`/user/${currentUser?.username}`} className="nav-link">
          <img
            src={
              currentUser?.image ||
              "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
            className="user-pic"
            alt={currentUser?.username}
          />
          {currentUser?.username}
        </Link>
      </li>
    </ul>
  );
};

const Header = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        {isAuth ? <LoggedInNavbar /> : <LoggedOutNavbar />}
      </div>
    </nav>
  );
};

export default Header;
