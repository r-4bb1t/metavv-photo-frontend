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
  name: "creatorData",
  initialState: { name: "", images: [] as Image[], len: 2 },
  reducers: {
    setName: (state, action) => {
      return { ...state, name: action.payload };
    },
    addImage: (state, action: { payload: Image; type: string }) => {
      const images = [...state.images, action.payload];
      return { ...state, images };
    },
    deleteImage: (state, action: { payload: string; type: string }) => {
      const images = state.images.filter(
        (image) => image.id !== action.payload
      );
      return { ...state, images };
    },
    resetImage: (state) => {
      return { ...state, images: [] };
    },
    setLen: (state, action) => {
      return { ...state, len: action.payload };
    },
  },
});

export default creatorData.reducer;

export const { setName, addImage, deleteImage, resetImage, setLen } =
  creatorData.actions;
