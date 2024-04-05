import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Contact} from '../types/list.types';
import {createInitialState} from '../types';

export const create = createAsyncThunk(
  'creates/create',
  async (payload: Omit<Contact, 'id'>) => {
    const response = await fetch('https://contact.herokuapp.com/contact', {
      method: 'post',
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  },
);

const createContactSlice = createSlice({
  name: 'create',
  initialState: createInitialState,
  extraReducers: builder => {
    builder.addCase(create.pending, state => {
      state.loading = true;
    });
    builder.addCase(create.fulfilled, state => {
      state.loading = false;
      state.message = 'success';
    });
    builder.addCase(create.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

// export const {addList} = createSlice.actions;
export const createSelector = (state: RootState) => state.createReducer;
export default createContactSlice.reducer;
