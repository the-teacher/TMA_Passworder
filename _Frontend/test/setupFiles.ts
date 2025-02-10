// README: https://remarkablemark.org/blog/2025/02/02/fix-jest-errors-in-react-router-7-upgrade/
import { TextEncoder } from "text-encoding";

globalThis.TextEncoder = TextEncoder;
