import { EventTypes, EventPayloads } from "./types";

const log = (...args: unknown[]) => {
  console.log("EventEmitter", ...args);
};

// EventEmitter.ts
// Define a type for the listener function, which accepts a payload of any type
type Listener<T extends EventTypes> = (payload: EventPayloads[T]) => void;

// Define an object to store events and their respective listeners
const events: { [K in EventTypes]?: Listener<K>[] } = {};

/**
 * Registers a listener for a specific event.
 * @param event - The name of the event to listen to.
 * @param listener - The function to execute when the event is emitted.
 */
const on = <T extends EventTypes>(event: T, listener: Listener<T>): void => {
  console.log("EventEmitter.on", event);

  if (!events[event]) {
    events[event] = [];
  }
  events[event].push(listener);
};

/**
 * Emits an event with an optional payload, calling all listeners associated with the event.
 * @param event - The name of the event to emit.
 * @param payload - The data to pass to each listener (optional).
 */
const emit = <T extends EventTypes>(
  eventName: T,
  payload: EventPayloads[T]
): void => {
  log("Emit", eventName, payload);
  log("All Events", events);

  if (events[eventName]) {
    log(`EventEmitter.emit ${eventName}`, events[eventName]);
    events[eventName].forEach((listener) => listener(payload));
  }
};

/**
 * Removes a specific listener for a given event.
 * @param event - The name of the event.
 * @param listenerToRemove - The listener function to remove.
 */
const off = <T extends EventTypes>(
  eventName: T,
  listenerToRemove: Listener<T>
): void => {
  log("Off", eventName);
  if (!events[eventName]) return;

  const filteredListeners = events[eventName].filter(
    (listener) => listener !== listenerToRemove
  );
  events[eventName] = filteredListeners as (typeof events)[T];
};

// Export the event emitter methods as a module
export default {
  on,
  emit,
  off
};
