import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchTodos2 = createAsyncThunk("fetchTodos2", async (num) => {
  const response = await fetch(`https://api.chess.com/pub/player/${num}`);
  return response.json();
});

const todoSlice2 = createSlice({
  name: "todo2",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos2.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos2.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos2.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice2.reducer;
