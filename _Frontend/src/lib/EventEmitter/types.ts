export type EventDescriptions = {
  NOTIFICATION: (message: string) => void;
  WARNING: (message: string) => void;
  ERROR: (message: string) => void;
  SUCCESS: (message: string) => void;
};

export type EventTypes = keyof EventDescriptions;
export type Listener<T extends EventTypes> = EventDescriptions[T];
