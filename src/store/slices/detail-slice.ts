import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Contact} from '../types/list.types';
import {detailInitialState} from '../types';

export const fetchDetail = createAsyncThunk(
  'details/fetchDetail',
  async (id: string) => {
    const response = await fetch(`https://contact.herokuapp.com/contact/${id}`);
    const data = await response.json();
    return data;
  },
);

const detailSlice = createSlice({
  name: 'detail',
  initialState: detailInitialState,
  extraReducers: builder => {
    builder.addCase(fetchDetail.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchDetail.fulfilled,
      (state, action: PayloadAction<{message: string; data: Contact}>) => {
        state.loading = false;
        state.data = action.payload?.data;
      },
    );
    builder.addCase(fetchDetail.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

// export const {addList} = detailSlice.actions;
export const detailSelector = (state: RootState) => state.detailReducer;
export default detailSlice.reducer;
