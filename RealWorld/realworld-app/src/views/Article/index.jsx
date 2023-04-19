import React, { Suspense, lazy, useContext, useEffect } from "react";
import ArticleMeta from "./ArticleMeta";
import { useParams } from "react-router-dom";
import Context from "../../app/context";
import api from "../../api";
import TagList from "../../components/TagList";

const CommentSection = lazy(() => import("../../components/CommentSection"));

const Article = () => {
  const { article, setArticle, setLoading } = useContext(Context);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    api.Articles.get(slug).then((response) => {
      setArticle(response.article);
      setLoading(false);
    });
  }, []);

  if (!article) {
    return (
      <div className="article-page">
        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <h1 role="alert">Article is loading</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article?.body}</p>

            <TagList tags={article.tagList} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>

        <Suspense fallback={<p>Loading comments</p>}>
          <CommentSection />
        </Suspense>
      </div>
    </div>
  );
};

export default Article;
