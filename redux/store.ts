import { configureStore } from "@reduxjs/toolkit";
import creatorDataReducer, { CreatorData } from "./data";

export interface StoreState {
  creatorData: CreatorData;
}

export default configureStore({
  reducer: {
    creatorData: creatorDataReducer,
  },
});
