import { createSlice } from "@reduxjs/toolkit";

export interface Photo {
  id: number;
  img: string;
  score: number;
}

export interface Result {
  name: string;
  images: Photo[];
}

const result = createSlice({
  name: "data",
  initialState: { name: "", images: [] as Photo[] },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    selectImage: (state, action: { payload: number; type: string }) => {
      state.images = state.images.map((image) => {
        if (image.id === action.payload) {
          return { ...image, score: image.score + 1 };
        }
        return image;
      });
    },
    setImages: (state, action: { payload: Photo[]; type: string }) => {
      state.images = action.payload;
    },
  },
});

export default result.reducer;

export const { setName, setImages, selectImage } = result.actions;
