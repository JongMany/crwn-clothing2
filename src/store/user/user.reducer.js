import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const {
    CHECK_USER_SESSION,
    EMAIL_SIGN_IN_START,
    GOOGLE_SIGN_IN_START,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILED,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILED,
    SIGN_OUT_START,
  } = USER_ACTION_TYPES;

  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
        error: null,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: null,
      };
    case SIGN_IN_FAILED:
    case SIGN_UP_FAILED:
    case SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case GOOGLE_SIGN_IN_START:
    case EMAIL_SIGN_IN_START:
    case SIGN_OUT_START:
    case CHECK_USER_SESSION:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    default:
      return state;
  }
};
