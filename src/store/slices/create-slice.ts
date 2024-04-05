import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Contact} from '../types/list.types';
import {createInitialState} from '../types';

export const create = createAsyncThunk(
  'contacts/create',
  async (payload: Omit<Contact, 'id'>) => {
    try {
      const response = await fetch('https://contact.herokuapp.com/contact', {
        method: 'post',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return {
          message: 'Success',
        };
      } else {
        console.error('Failed to post data');
      }
    } catch (error) {
      console.log({error});
      throw error;
    }
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
  reducers: {
    resetCreate(state) {
      state.loading = createInitialState.loading;
      state.message = createInitialState.message;
      state.error = createInitialState.error;
    },
  },
});

export const {resetCreate} = createContactSlice.actions;
export const createSelector = (state: RootState) => state.createReducer;
export default createContactSlice.reducer;
