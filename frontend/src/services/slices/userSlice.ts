import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserProfile,
  getUserProfile,
  loginUserApi,
  patchUserProfile,
  registerUserApi,
} from "../../utils/tutor-api";

type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type TRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type TLoginData = {
  email: string;
  password: string;
};

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  registerUserRequest: boolean;
  getUserError: string | null;
  getUserRequest: boolean;
  resetPasswordRequest: boolean;
  resetPasswordError: string | null;
  logoutUserRequest: boolean;
  logoutUserError: string | null;
  updateUserRequest: boolean;
  updateUserError: string | null;
  deleteUserRequest: boolean;
  deleteUserError: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  registerUserRequest: false,
  getUserError: null,
  getUserRequest: false,
  resetPasswordRequest: false,
  resetPasswordError: null,
  logoutUserRequest: false,
  logoutUserError: null,
  updateUserRequest: false,
  updateUserError: null,
  deleteUserRequest: false,
  deleteUserError: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: TRegisterData): Promise<TUser> => {
    const response = await registerUserApi(userData);
    localStorage.setItem("token", response.token);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: TLoginData): Promise<TUser> => {
    const response = await loginUserApi(userData);
    localStorage.setItem("token", response.token);
    return response.user;
  }
);

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (): Promise<TUser> => {
    const response = await getUserProfile();
    return response.user;
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<TUser> => {
    const response = await patchUserProfile(userData);
    return response.user;
  }
);

export const deleteUserAccount = createAsyncThunk(
  "auth/deleteUserAccount",
  async (password: string): Promise<{ success: boolean; message: string }> => {
    const response = await deleteUserProfile(password);
    localStorage.removeItem("token");
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  selectors: {
    getUserSelectors: (state) => state,
  },
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      state.loginUserError = null;
      state.registerUserError = null;
      state.getUserError = null;
      localStorage.removeItem("token");
    },
    // Добавляем action для очистки ошибки регистрации
    clearRegisterError: (state) => {
      state.registerUserError = null;
    },
    // И для логина тоже можно добавить
    clearLoginError: (state) => {
      state.loginUserError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserError = action.error.message || "Ошибка регистрации";
        state.registerUserRequest = false;
        state.isAuthChecked = true;
      })

      // Вход пользователя
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserError = action.error.message || "Ошибка авторизации";
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })

      // Получение данных пользователя
      .addCase(getUserData.pending, (state) => {
        state.getUserRequest = true;
        state.getUserError = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.getUserRequest = false;
        state.getUserError = action.error.message || "Ошибка получения данных";
        state.isAuthChecked = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      // Обновление данных пользователя
      .addCase(updateUserProfile.pending, (state) => {
        state.updateUserRequest = true;
        state.logoutUserError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.updateUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateUserRequest = false;
        state.updateUserError =
          action.error.message || "Ошибка обновления данных";
        state.isAuthChecked = true;
      })

      // Удаление аккаунта
      .addCase(deleteUserAccount.pending, (state) => {
        state.deleteUserRequest = true;
        state.deleteUserError = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.deleteUserRequest = false;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.deleteUserRequest = false;
        state.deleteUserError =
          action.error.message || "Ошибка удаления аккаунта";
      });
  },
});

export const { authChecked, logout, clearLoginError, clearRegisterError } = userSlice.actions;
export const { getUserSelectors } = userSlice.selectors;
export default userSlice.reducer;
