import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchTodos3 = createAsyncThunk("fetchTodos3", async (num) => {
  const year = new Date().getFullYear();
  var today = new Date(),
  curMonth = today.getMonth() + 1;
  const month = curMonth < 10 ? '0' + curMonth : curMonth;

  const response = await fetch(`https://api.chess.com/pub/player/${num}/games/${year}/${month}`);
  return response.json();
});

const todoSlice3 = createSlice({
  name: "todo3",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos3.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos3.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos3.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice3.reducer;
