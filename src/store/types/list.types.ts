export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export interface ListState {
  loading: boolean;
  list: Array<Contact>;
  error: string | undefined;
}

export const initialState: ListState = {
  loading: false,
  list: [],
  error: undefined,
};
