import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Contact} from '../types/list.types';
import {updateInitialState} from '../types';

export const update = createAsyncThunk(
  'contacts/update',
  async (payload: Omit<Contact, 'id'>) => {
    const response = await fetch('https://contact.herokuapp.com/contact', {
      method: 'put',
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  },
);

const updateContactSlice = createSlice({
  name: 'update',
  initialState: updateInitialState,
  extraReducers: builder => {
    builder.addCase(update.pending, state => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, state => {
      state.loading = false;
      state.message = 'success';
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

// export const {addList} = updateSlice.actions;
export const updateSelector = (state: RootState) => state.updateReducer;
export default updateContactSlice.reducer;
