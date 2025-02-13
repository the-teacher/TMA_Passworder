// Page paths
export const indexPath = () => "/";
export const createPath = () => "/create";
export const searchPath = () => "/search";
export const favoritesPath = () => "/favorites";
export const logoutPath = () => "/logout";
export const settingsPath = () => "/settings";
export const aboutPath = () => "/about";

// Dynamic paths with params
export const passwordEntryPath = (id: string) => `/passwords/${id}`;
export const editPasswordEntryPath = (id: string) => `/passwords/${id}/edit`;

// API paths
export const apiPasswordEntriesPath = () => "/api/v1/password_entries";
export const apiPasswordEntryPath = (id: string) =>
  `/api/v1/password_entries/${id}`;
