import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todo";
import todoReducer2 from "./slice/todo2"
import todoReducer3 from "./slice/todo3"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    todo2: todoReducer2,
    todo3: todoReducer3,
  },
});
