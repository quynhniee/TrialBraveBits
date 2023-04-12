import React, { useContext } from "react";
import ArticleList from "../../components/ArticleList";
import Context from "../../app/context";
import { AuthContext } from "../../features/auth";

const YourFeed = () => {
  const { articleList, changeTab } = useContext(Context);
  const isAuthenticated = useContext(AuthContext);
  const currentTab = articleList.tab;
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
  const { articleList, changeTab } = useContext(Context);
  const currentTab = articleList.tab;
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
const View = () => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeed />

          <GlobalFeed />
        </ul>
      </div>

      <ArticleList />
    </div>
  );
};

export default View;
