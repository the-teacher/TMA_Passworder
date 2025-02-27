// RESTful routes for PasswordEntries (like Rails resources :password_entries)
export const listPasswordEntriesPath = () => "/password_entries";
export const newPasswordEntryPath = () => "/password_entries/new";
export const editPasswordEntryPath = (id: string = ":id") =>
  `/password_entries/${id}/edit`;
export const showPasswordEntryPath = (id: string = ":id") =>
  `/password_entries/${id}`;

// Other page paths
export const indexPath = () => "/";
export const favoritesPath = () => "/favorites";
export const logoutPath = () => "/logout";
export const settingsPath = () => "/settings";
export const aboutPath = () => "/about";

// API paths (RESTful)
export const apiPasswordEntriesPath = () => "/api/v1/password_entries";
export const apiPasswordEntryPath = (id: string) =>
  `/api/v1/password_entries/${id}`;
