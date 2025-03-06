import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Frontend port for development
const FRONTEND_PORT = parseInt(process.env.VITE_FRONTEND_PORT || "4000", 10);

// Allowed hosts for development
const ALLOWED_HOSTS = process.env.VITE_ALLOWED_HOSTS?.split(",") || [
  "localhost"
];

export { FRONTEND_PORT, ALLOWED_HOSTS };
