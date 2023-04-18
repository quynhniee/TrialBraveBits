import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../../app/context";
import Errors from "../../components/Errors";
import api from "../../api";
import { createArticle, updateArticle } from "../../features/article";

const Editor = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { article } = useContext(Context);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changeBody = (event) => {
    setBody(event.target.value);
  };

  const changeTagInput = (event) => {
    setTagInput(event.target.value);
  };

  const resetValue = () => {
    if (slug && article) {
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      setTagList(article.tagList);
    } else {
      setTitle("");
      setDescription("");
      setBody("");
      setTagInput("");
      setTagList([]);
    }
  };

  const addTag = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (tagInput && !tagList.includes(tagInput))
        setTagList([...tagList, tagInput]);

      setTagInput("");
    }
  };

  const removeTag = (tag) => () => {
    setTagList(tagList.filter((_tag) => _tag !== tag));
  };

  const rejected = (data) => setErrors(data);

  const pending = (article) => {
    navigate("/");
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const article = {
      slug,
      title,
      description,
      body,
      tagList,
    };
    // console.log(slug);
    slug
      ? updateArticle({ slug, article }, rejected, pending)
      : createArticle({ article }, rejected, pending);

    // slug
    //   ? await api.Articles.update(slug, article)
    //   : await api.Articles.create(article);
    // navigate("/");
  };

  useEffect(() => {
    resetValue();
  }, []);
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Errors errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={title}
                    onChange={changeTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={changeDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={changeBody}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={changeTagInput}
                    onKeyUp={addTag}
                  />

                  <div className="tag-list">
                    {tagList.map((tag) => {
                      return (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            className="ion-close-round"
                            onClick={removeTag(tag)}
                          />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={submitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
