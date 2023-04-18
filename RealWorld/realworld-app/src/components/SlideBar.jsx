import React, { useContext, useEffect } from "react";
import Context from "../app/context";
import Tags from "../api/Tags";

const SlideBar = () => {
  const { tags, setTags, getArticlesByTag, setCurrentTag, setCurrentTab } =
    useContext(Context);
  const onClickHandle = (tag) => {
    setCurrentTag(tag);
    setCurrentTab();
    getArticlesByTag({ tag, page: 0 });
  };

  useEffect(() => {
    Tags.getAll().then((resp) => setTags(resp.tags));
  }, []);

  if (!tags || tags.length === 0)
    return (
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>
          <div className="tag-list">Loading tags...</div>
        </div>
      </div>
    );

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
              onClick={() => onClickHandle(tag)}
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
