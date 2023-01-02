export interface ResponseParams {
  error: boolean;
  msg: string;
  authenticated?: boolean;
  payload: any;
  status_code: number;
  isLoggedOut?: boolean;
}

export interface OptionalResponseParams {
  error?: boolean;
  msg?: string;
  authenticated?: boolean;
  payload?: any;
  status_code?: number;
  isLoggedOut?: boolean;
}
