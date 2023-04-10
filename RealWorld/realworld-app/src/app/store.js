import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "../reducers/articleListSlice";
import tagsReducer from "../features/tags/tagsSlice";

const store = configureStore({
  reducer: {
    articleList: articleListReducer,
    tags: tagsReducer,
  },
});

export default store;
