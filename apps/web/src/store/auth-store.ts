import axios from "axios";
import { Params } from "react-router-dom";
import { create } from "zustand";
axios.defaults.withCredentials = true;
const URL = "http://localhost:3000/api/auth";
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  error: string | boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => {
  return {
    user: null,
    isAuthenticated: false,
    error: false,
    isLoading: false,
    isCheckingAuth: true,

    signUp: async (email: string, password: string, name: string) => {
      set({ isLoading: true, error: false });
      try {
        const response = await axios.post(`${URL}/signup`, {
          email,
          password,
          name,
        });
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      } catch (error) {
        set({
          error: "Error signing up",
          isLoading: false,
        });
        throw error;
      }
    },
    verifyEmail: async (code: string) => {
      set({ isLoading: true, error: false });
      try {
        const response = await axios.post(`${URL}/verify-email`, { code });
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        set({
          error: "Error verifying email",
          isLoading: false,
        });
        throw error;
      }
    },
    checkAuth: async () => {
      set({ isCheckingAuth: true, error: false });
      try {
        const response = await axios.get(`${URL}/check-auth`);
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } catch (error) {
        set({ error: false, isCheckingAuth: false, isAuthenticated: false });
      }
    },
    login: async (email: string, password: string) => {
      set({ isLoading: true, error: false });
      try {
        const response = await axios.post(`${URL}/login`, {
          email,
          password,
        });
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: false,
        });
      } catch (error) {
        set({
          error: "Error logging in",
          isLoading: false,
          isAuthenticated: false,
        });
        throw error;
      }
    },
    logout: async () => {
      set({ isLoading: true, error: false });
      try {
        const response = await axios.get(`${URL}/logout`);
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isCheckingAuth: false,
          error: false,
        });
      } catch (error) {
        set({
          error: true,
          isCheckingAuth: false,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    },
    forgotPassword: async (email: string) => {
      set({ isLoading: true, error: false });
      try {
        const response = await axios.post(`${URL}/forgot-password`, { email });

        set({
          isLoading: false,
        });
      } catch (error) {
        set({ isLoading: false, error: "Error in forgot password" });
        throw error;
      }
    },
    resetPassword: async (token: string, password: string) => {
      set({ isLoading: true, error: false });
      try {
        const response = await axios.post(`${URL}/reset-password/${token}`, {
          password,
        });
        set({ isLoading: false, error: false });
      } catch (error) {
        set({ isLoading: false, error: true });
      }
    },
  };
});
