import React from "react";
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { setAuthToken } from "../api/axios";
export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (token && storedUser) {
      setAuthToken(token);
      setUser(storedUser);

      (async () => {
        try {
          const res = await api.get("/favorites");
          setFavorites(res.data.favorites);
        } catch (err) {
          console.error("Error fetching favorites:", err);
          if (err?.response?.status === 401) {
            logout();
          }
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuthToken(token);
      setUser(userData);
      setFavorites(userData.favorites || []);
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Login failed" };
    }
  };
  const register = async (email, password) => {
    try {
      const res = await api.post("/auth/register", { email, password });
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("Registration error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setFavorites([]);
  };
  const addFavorite = async (movie) => {
    if (!user) return;
    try {
      const favoriteMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      };
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/favorites/add",
        { movie: favoriteMovie },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites(res.data.favorites || []);
      const updatedUser = { ...user, favorites: res.data.favorites };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };
  const fetchFavorites = async () => {
    if (!user) return;
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };
  const removeFavorite = async (movieId) => {
    if (!user) return;
    try {
      const res = await api.post("/favorites/remove/", { movieId });
      setFavorites(res.data.favorites || []);
      const updatedUser = { ...user, favorites: res.data.favorites };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        favorites,
        login,
        logout,
        addFavorite,
        removeFavorite,
        fetchFavorites,
        register,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
