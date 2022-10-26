import { createSlice } from "@reduxjs/toolkit";

export interface Image {
  file: File;
  id: string;
}

export interface CreatorData {
  name: string;
  images: Image[];
  len: number;
}

const creatorData = createSlice({
  name: "data",
  initialState: { name: "", images: [] as Image[], len: 2 },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addImage: (state, action: { payload: Image; type: string }) => {
      state.images = [...state.images, action.payload];
    },
    deleteImage: (state, action: { payload: string; type: string }) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload
      );
    },
    resetImage: (
      state,
      action: { payload: null | undefined; type: string }
    ) => {
      state.images = [];
    },

    setLen: (state, action) => {
      state.len = action.payload;
    },
  },
});

export default creatorData.reducer;

export const { setName, addImage, deleteImage, resetImage, setLen } =
  creatorData.actions;
