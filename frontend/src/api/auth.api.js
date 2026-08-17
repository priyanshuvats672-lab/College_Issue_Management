import api from "./axios";

export const registerApi = (userData) =>
    api.post("/v1/user/register", userData);

export const loginApi = (userData) =>
    api.post("/v1/user/login", userData);

export const logoutApi = (refreshToken) =>
    api.post("/v1/user/logout", { refreshToken });

export const refreshAccessTokenApi = () =>
    api.post("/v1/user/refresh");

export const getCurrentUserApi = () =>
    api.get("/v1/user/me");