// import { ElementType } from "react";
export type EventTypes = "NOTIFICATION" | "WARNING";

export type EventPayloads = {
  NOTIFICATION: (message: string) => void;
  WARNING: (message: string) => void;
};
