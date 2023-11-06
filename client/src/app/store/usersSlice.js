import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../service/localStorage.service";
import authService from "../service/auth.service";
import history from "../utils/history";
import { generationAuthError } from "../utils/generationAuthError";
import userService from "../service/user.service";

const initialState = localStorageService.getTokenKey()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getLocalIdKey() },
      dataLoader: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      dataLoader: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.isLoading = action.payload;
      state.error = action.payload;
      state.isLoading = false;
    },
    usersGetFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersGetFailed,
  authRequestFailed,
  authRequestSuccess,
} = actions;

const authRequested = createAction("users/authRequested");

export const signUp = ({ payload, redirect }) => {
  return async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register(payload);
      dispatch(authRequestSuccess({ userId: data.userId }));

      localStorageService.setTokens(data);

      history.push(redirect);
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };
};

export const login = ({ payload, redirect }) => {
  return async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.join({ email, password });
      dispatch(authRequestSuccess({ userId: data.userId }));

      localStorageService.setTokens(data);

      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;

      if (code === 400) {
        const errorMessage = generationAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(generationAuthError(error.message)));
      }
    }
  };
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    usersGetFailed(error.message);
  }
};

export default usersReducer;