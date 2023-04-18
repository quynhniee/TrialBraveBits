import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../../app/context";
import ArticleList from "../../components/ArticleList";
import api from "../../api";
import { AuthContext } from "../../app/auth";

const EditProfileSettings = () => {
  return (
    <Link
      to="/settings"
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-gear-a" /> Edit Profile Settings
    </Link>
  );
};

const FollowUserButton = ({ username, isFollowed }) => {
  const [following, setFollowing] = useState(isFollowed);
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  const followHandle = () => {
    setFollowing(true);
    api.Profile.follow(username);
  };

  const unfollowHandle = () => {
    setFollowing(false);
    api.Profile.unfollow(username);
  };

  const followAuthorHandle = () => {
    if (isAuth !== true) {
      navigate("/login");
      return;
    }
    following === true ? unfollowHandle() : followHandle();
  };

  return (
    <button
      className={`btn btn-sm action-btn ${following === true ? "active" : ""}`}
      onClick={followAuthorHandle}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following === true ? "Unfollow " : "Follow"} {username}
    </button>
  );
};

const UserInfo = ({ profile }) => {
  const isCurrentUser = undefined;
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={
                profile.image ||
                "https://static.productionready.io/images/smiley-cyrus.jpg"
              }
              className="user-img"
              alt={profile.username}
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>

            {isCurrentUser ? (
              <EditProfileSettings />
            ) : (
              <FollowUserButton
                username={profile.username}
                isFollowed={profile.following}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTabs = ({ username, isFavorites }) => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={isFavorites ? "nav-link" : "nav-link active"}
            to={`/user/${username}`}
          >
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={isFavorites ? "nav-link active" : "nav-link"}
            to={`/user/${username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Profile = ({ isFavoritePage }) => {
  const {
    profile,
    setProfile,
    getFavoriteArticles,
    getArticlesByAuthor,
    setCurrentAuthor,
  } = useContext(Context);
  const { username } = useParams();
  // const [profile, setProfile] = useState();

  useEffect(() => {
    api.Profile.get(username).then((response) => {
      setProfile(response.profile);
    });
    setCurrentAuthor(username);
    isFavoritePage
      ? getFavoriteArticles({ username })
      : getArticlesByAuthor({ author: username });
  }, [username, isFavoritePage]);

  if (!profile) return;
  return (
    <div className="profile-page">
      <UserInfo profile={profile} />

      <div className="container page">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ProfileTabs
              username={profile.username}
              isFavorites={isFavoritePage}
            />

            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
