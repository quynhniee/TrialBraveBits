import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../../app/context";
import ArticleList from "../../components/ArticleList";
import api from "../../api";

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

const FollowUserButton = ({ username, following }) => {
  let message = "";
  let className = "btn btn-sm action-btn";
  if (following) {
    className += " btn-secondary";
    message = `Unfollow ${username}`;
  } else {
    className += " btn-outline-secondary";
    message = `Follow ${username}`;
  }
  const onClickHandle = () => {};
  <button className={className} onClick={onClickHandle}>
    <i className="ion-plus-round" />
    &nbsp;
    {message}
  </button>;
};

const UserInfo = ({ profile }) => {
  const isCurrentUser = false;
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

            {/* {isCurrentUser ? (
              <EditProfileSettings />
            ) : (
              <FollowUserButton
                username={profile.username}
                following={profile.following}
              />
            )} */}
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

const Profile = () => {
  const { profile, setProfile, getAllArticles } = useContext(Context);
  const { username } = useParams();

  useEffect(() => {
    api.Profile.get(username).then((resp) => setProfile(resp.profile));
    // getAllArticles({ page: 0 });
  }, []);
  if (!profile) return;
  return (
    <div className="profile-page">
      <UserInfo profile={profile} />

      <div className="container page">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ProfileTabs
              username={profile.username}
              //   isFavorites={isFavoritePage}
            />

            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
