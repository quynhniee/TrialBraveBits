import React, { useContext, useEffect } from "react";
import ArticleList from "../../components/ArticleList";
import Context from "../../app/context";
import { AuthContext } from "../../app/auth";

const YourFeed = () => {
  const { currentTab, changeTab } = useContext(Context);
  const isAuthenticated = useContext(AuthContext);
  const isActiveTab = currentTab === "feed";

  const onClickHandle = () => {
    changeTab("feed");
  };

  if (isAuthenticated !== true) return null;
  return (
    <li className="nav-item">
      <button
        type="button"
        className={isActiveTab ? "nav-link active" : "nav-link"}
        onClick={onClickHandle}
      >
        Your Feed
      </button>
    </li>
  );
};

const GlobalFeed = () => {
  const { currentTab, changeTab } = useContext(Context);
  const isActiveTab = currentTab === "all";

  const onClickHandle = () => {
    changeTab("all");
  };

  return (
    <li className="nav-item">
      <button
        type="button"
        className={isActiveTab ? "nav-link active" : "nav-link"}
        onClick={onClickHandle}
      >
        Global Feed
      </button>
    </li>
  );
};

const Filter = () => {
  const { currentTag } = useContext(Context);
  if (!currentTag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button type="button" className="nav-link active">
        <i className="ion-pound" /> {currentTag}
      </button>
    </li>
  );
};
const View = () => {
  const { isAuth } = useContext(AuthContext);
  const { changeTab } = useContext(Context);
  useEffect(() => {
    changeTab(isAuth === true ? "feed" : "all");
  }, []);

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeed />

          <GlobalFeed />

          <Filter />
        </ul>
      </div>
      <ArticleList />
    </div>
  );
};

export default View;
