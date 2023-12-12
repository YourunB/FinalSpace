import { createSlice } from '@reduxjs/toolkit';

const initialState={
  maxPage: 0,
  episodesArr: null,
  charactersArr: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateSaveEpisodes: (state, action) => {
      let array = action.payload;
      let size = 8;
      let subarray = [];
      for (let i = 0; i < Math.ceil(array.length/size); i++) subarray[i] = array.slice((i*size), (i*size) + size);
      state.episodesArr = subarray;
      state.maxPage = Math.ceil(action.payload.length / 8);
    },

    
    updateSaveCharacters: (state, action) => {
      state.charactersArr = action.payload;
    },

  },
});

export const { updateSaveEpisodes, updateSaveCharacters } = dataSlice.actions;

export default dataSlice.reducer;
