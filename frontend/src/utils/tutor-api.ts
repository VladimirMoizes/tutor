// const API_URL = process.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173/api";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TAuthResponse = {
  success: boolean;
  message?: string;
  error?: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

// Универсальная функция запроса
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {},
  requiresAuth: boolean = false
): Promise<T> => {
  const token = localStorage.getItem("token");

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(requiresAuth && token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, config);
    return await checkResponse<T>(response);
  } catch (error: any) {
    if (
      error.message?.includes("jwt expired") ||
      error.message?.includes("Невалидный токен")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    throw error;
  }
};

// API функции
export const registerUserApi = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<TAuthResponse> => {
  return apiRequest<TAuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUserApi = (userData: {
  email: string;
  password: string;
}): Promise<TAuthResponse> => {
  return apiRequest<TAuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getUserProfile = (): Promise<TAuthResponse> => {
  return apiRequest<TAuthResponse>("/auth/me", {}, true);
};

export const patchUserProfile = (userData: {
  name?: string;
  lastName?: string;
  email?: string;
}): Promise<TAuthResponse> => {
  return apiRequest<TAuthResponse>(
    "/auth/profile",
    {
      method: "PATCH",
      body: JSON.stringify(userData),
    },
    true
  );
};

export const deleteUserProfile = (
  password: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest<{ success: boolean; message: string }>(
    "/auth/account",
    {
      method: "DELETE",
      body: JSON.stringify({ password }),
    },
    true
  );
};
