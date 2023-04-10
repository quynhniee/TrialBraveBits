import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const getAllTag = createAsyncThunk("tags/getAll", async () => {
  const { tags } = await api.Tags.getAll();
  return tags;
});

const initialState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTag.fulfilled, (_, action) => ({
      tags: action.payload,
    }));
  },
});

export default tagsSlice.reducer;
