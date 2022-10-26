import { configureStore } from "@reduxjs/toolkit";
import creatorDataReducer, { CreatorData } from "./data";
import ResultReducer, { Result } from "./result";

export interface StoreState {
  creatorData: CreatorData;
  result: Result;
}

export default configureStore({
  reducer: {
    creatorData: creatorDataReducer,
    resulr: ResultReducer,
  },
});
