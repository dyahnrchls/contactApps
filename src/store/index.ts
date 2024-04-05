import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import listReducer from './slices/list-slice';
import detailReducer from './slices/detail-slice';
import createReducer from './slices/create-slice';
import updateReducer from './slices/update-slice';
import removeReducer from './slices/delete-slice';

const store = configureStore({
  reducer: {
    listReducer,
    detailReducer,
    createReducer,
    updateReducer,
    removeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
