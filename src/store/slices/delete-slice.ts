import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {removeInitialState} from '../types';

export const remove = createAsyncThunk(
  'contacts/remove',
  async (id: string) => {
    try {
      const response = await fetch(
        `https://contact.herokuapp.com/contact/${id}`,
        {
          method: 'delete',
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error({error});
      throw error;
    }
  },
);

const removeContactSlice = createSlice({
  name: 'remove',
  initialState: removeInitialState,
  extraReducers: builder => {
    builder.addCase(remove.pending, state => {
      state.loading = true;
    });
    builder.addCase(remove.fulfilled, state => {
      state.loading = false;
      state.message = 'success';
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message;
    });
  },
  reducers: {
    resetRemove(state) {
      state.loading = removeInitialState.loading;
      state.message = removeInitialState.message;
      state.error = removeInitialState.error;
    },
  },
});

export const {resetRemove} = removeContactSlice.actions;
export const removeSelector = (state: RootState) => state.removeReducer;
export default removeContactSlice.reducer;
