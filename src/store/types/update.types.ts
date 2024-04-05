export interface UpdateState {
  loading: boolean;
  message: string | null;
  error: string | undefined;
}

export const updateInitialState: UpdateState = {
  loading: false,
  message: null,
  error: undefined,
};
