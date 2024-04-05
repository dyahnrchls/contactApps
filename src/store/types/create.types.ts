export interface CreateState {
  loading: boolean;
  message: string | null;
  error: string | undefined;
}

export const createInitialState: CreateState = {
  loading: false,
  message: null,
  error: undefined,
};
