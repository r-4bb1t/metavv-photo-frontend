import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import creatorDataReducer, { CreatorData } from "./creatorData";
import ResultReducer, { Result } from "./result";

export interface StoreState {
  creatorData: CreatorData;
  result: Result;
}

export default configureStore({
  reducer: {
    creatorData: creatorDataReducer,
    result: ResultReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
