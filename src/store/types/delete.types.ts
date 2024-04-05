export interface RemoveState {
  loading: boolean;
  message: string | null;
  error: string | undefined;
}

export const removeInitialState: RemoveState = {
  loading: false,
  message: null,
  error: undefined,
};
