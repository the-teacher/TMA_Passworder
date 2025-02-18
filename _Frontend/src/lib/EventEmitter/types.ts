import { ElementType } from "react";
export type EventTypes = "NOTIFICATION" | "WARNING";

export type EventPayloads = {
  NOTIFICATION: { message: string | ElementType };
  WARNING: { message: string | ElementType };
};
