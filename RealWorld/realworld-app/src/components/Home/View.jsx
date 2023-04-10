import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../ArticleList";
import { changeTab } from "../../reducers/articleListSlice";

const YourFeed = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.articleList.tab);
  const isActiveTab = currentTab === "feed";

  const onClickHandle = () => {
    changeTab("feed", dispatch);
  };

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
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.articleList.tab);
  const isActiveTab = currentTab === "all";

  const onClickHandle = () => {
    changeTab("all", dispatch);
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
