import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "../reducers/articleListSlice";

const store = configureStore({
  reducer: {
    articleList: articleListReducer,
  },
});

export default store;
