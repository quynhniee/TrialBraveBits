import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const changeTab = (tab, dispatch) => {
  dispatch(articleListSlice.actions.changeTab(tab));
  return dispatch(getAllArticles());
};

export const getAllArticles = createAsyncThunk(
  "articleList/getAll",
  ({ page, tag, author, favorited } = {}, thunkApi) => {
    const articleList = thunkApi.getState().articleList;
    return articleList.tab === "feed"
      ? api.Articles.feed(page)
      : api.Articles.getAll({
          page: page ?? articleList.currentPage,
          tag: tag ?? articleList.tag,
          author: author ?? articleList.author,
          favorited: favorited ?? articleList.favorited,
          limit: 10,
        });
  }
);

const favoriteArticles = createAsyncThunk(
  "articleList/favoriteArticles",
  api.Articles.favorite
);

const unfavoriteArticles = createAsyncThunk(
  "articleList/unfavoriteArticles",
  api.Articles.unfavorite
);

const initialState = {
  articles: [],
  articlesCount: 0,
  currentPage: 0,
  tab: undefined,
  tag: undefined,
  author: undefined,
  favorited: undefined,
};

const articleListSlice = createSlice({
  name: "articleList",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(favoriteArticles.fulfilled, (state, action) => {
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.article.slug
          ? {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount,
            }
          : article
      );
    });

    builder.addCase(unfavoriteArticles.fulfilled, (state, action) => {
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.article.slug
          ? {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount,
            }
          : article
      );
    });

    builder.addCase(getAllArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.currentPage = action.meta.arg?.page ?? 0;
    });
  },
});

export const { articleListActions } = articleListSlice.actions;
export default articleListSlice.reducer;
