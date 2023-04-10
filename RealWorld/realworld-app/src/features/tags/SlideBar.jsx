import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../../reducers/articleListSlice";
import { getAllTag } from "./tagsSlice";

const SlideBar = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);

  const onClickHandle = (tag) => {
    dispatch(getAllArticles({ tag }));
  };

  useEffect(() => {
    dispatch(getAllTag());
  }, []);

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tags.map((tag) => (
            <button
              type="button"
              className="tag-pill tag-default"
              key={tag}
              onClick={onClickHandle}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
