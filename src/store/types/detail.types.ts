import {Contact} from './list.types';

export interface DetailState {
  loading: boolean;
  data: Contact | null;
  error: string | undefined;
}

export const detailInitialState: DetailState = {
  loading: false,
  data: null,
  error: undefined,
};
