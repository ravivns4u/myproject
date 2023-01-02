import type {
  ResponseParams,
  OptionalResponseParams,
} from '../../redux/interfaces/backend/apiHandlers';

const defaultGenericResponsePayload: ResponseParams = {
  error: false,
  status_code: 200,
  msg: '',
  payload: {},
  authenticated: false,
};

const errorResponseParams: ResponseParams = {
  error: true,
  status_code: 401,
  msg: '',
  payload: {},
  authenticated: false,
};

export const genericResponse = (
  response: OptionalResponseParams
): ResponseParams => {
  return {
    ...defaultGenericResponsePayload,
    ...response,
  };
};

export const errorResponse = (
  response: OptionalResponseParams
): ResponseParams => {
  return {
    ...errorResponseParams,
    ...response,
  };
};
