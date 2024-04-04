import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Contact, listInitialState} from '../types/list.types';

export const fetchLists = createAsyncThunk('lists/fetchLists', () => {
  const res = fetch('https://contact.herokuapp.com/contact').then(data =>
    data.json(),
  );
  return res;
});

const listSlice = createSlice({
  name: 'list',
  initialState: listInitialState,
  extraReducers: builder => {
    builder.addCase(fetchLists.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchLists.fulfilled,
      (
        state,
        action: PayloadAction<{message: string; data: Array<Contact>}>,
      ) => {
        state.loading = false;
        state.list = action.payload?.data;
      },
    );
    builder.addCase(fetchLists.rejected, (state, action) => {
      state.loading = false;
      state.list = [];
      state.error = action.error.message;
    });
  },
  reducers: {},
});

// export const {addList} = listSlice.actions;
export const listSelector = (state: RootState) => state.listReducer;
export default listSlice.reducer;
