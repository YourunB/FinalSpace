import { createSlice } from '@reduxjs/toolkit';

const initialState={
  page: 1,
  maxPage: 0,
  episodesArr: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateSaveEpisodes: (state, action) => {
      state.episodesArr = action.payload;
/*
      let array = action.payload;
      let size = 8;
      let subarray = [];
      for (let i = 0; i < Math.ceil(array.length/size); i++) subarray[i] = array.slice((i*size), (i*size) + size);
      state.episodesArr = subarray;


      state.maxPage = Math.ceil(action.payload.length / 8);*/
    },

  },
});

export const { updateSaveEpisodes } = dataSlice.actions;

export default dataSlice.reducer;
