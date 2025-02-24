import { EventDescriptions, EventTypes, Listener } from "./types";

const log = (...args: unknown[]) => {
  console.log("EventEmitter", ...args);
};

const events: { [K in EventTypes]?: Listener<K>[] } = {};

const on = <T extends EventTypes>(event: T, listener: Listener<T>): void => {
  console.log("EventEmitter.on", event);

  if (!events[event]) {
    events[event] = [];
  }
  events[event]?.push(listener);
};

const emit = <T extends EventTypes>(
  eventName: T,
  arg: Parameters<EventDescriptions[T]>[0]
): void => {
  log("Emit", eventName, arg);
  log("All Events", events);

  if (events[eventName]) {
    log(`EventEmitter.emit ${eventName}`, events[eventName]);
    events[eventName]?.forEach((listener) => {
      (listener as (param: typeof arg) => void)(arg);
    });
  }
};

const off = <T extends EventTypes>(
  eventName: T,
  listenerToRemove: Listener<T>
): void => {
  log("Off", eventName);
  if (!events[eventName]) return;

  events[eventName] = events[eventName]?.filter(
    (listener) => listener !== listenerToRemove
  ) as (typeof events)[T];
};

const EventEmitter = {
  on,
  emit,
  off
};

export default EventEmitter;
