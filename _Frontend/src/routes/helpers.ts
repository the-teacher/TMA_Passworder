// Page paths
export const indexPath = () => "/";
export const createPath = () => "/create";
export const favoritesPath = () => "/favorites";
export const logoutPath = () => "/logout";
export const settingsPath = () => "/settings";
export const aboutPath = () => "/about";

// Dynamic paths with params
export const passwordEntryPath = (id: string) => `/passwords/${id}`;
export const editPasswordEntryPath = (id: string) => `/passwords/${id}/edit`;
export const showPasswordEntryPath = (id: string) => `/passwords/${id}`;

// API paths
export const apiPasswordEntriesPath = () => "/api/v1/password_entries";
export const apiPasswordEntryPath = (id: string) =>
  `/api/v1/password_entries/${id}`;
