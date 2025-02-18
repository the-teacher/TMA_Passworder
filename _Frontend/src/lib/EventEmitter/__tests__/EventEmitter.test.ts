import EventEmitter from "@lib/EventEmitter";
import { EventTypes } from "../types";

describe("EventEmitter", () => {
  beforeEach(() => {
    // Clear all event listeners before each test
    const events = Object.keys(EventEmitter) as EventTypes[];
    events.forEach((event) => {
      const mockListener = jest.fn();
      EventEmitter.off(event, mockListener);
    });
  });

  test("should emit and receive notification events", () => {
    const mockListener = jest.fn();
    const payload = { message: "Test notification" };

    EventEmitter.on("NOTIFICATION", mockListener);
    EventEmitter.emit("NOTIFICATION", payload);

    expect(mockListener).toHaveBeenCalledWith(payload);
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("should emit and receive warning events", () => {
    const mockListener = jest.fn();
    const payload = { message: "Test warning" };

    EventEmitter.on("WARNING", mockListener);
    EventEmitter.emit("WARNING", payload);

    expect(mockListener).toHaveBeenCalledWith(payload);
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("should remove event listener when off is called", () => {
    const mockListener = jest.fn();
    const payload = { message: "Test message" };

    EventEmitter.on("NOTIFICATION", mockListener);
    EventEmitter.off("NOTIFICATION", mockListener);
    EventEmitter.emit("NOTIFICATION", payload);

    expect(mockListener).not.toHaveBeenCalled();
  });

  test("should handle multiple listeners for same event", () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    const payload = { message: "Test message" };

    EventEmitter.on("NOTIFICATION", mockListener1);
    EventEmitter.on("NOTIFICATION", mockListener2);
    EventEmitter.emit("NOTIFICATION", payload);

    expect(mockListener1).toHaveBeenCalledWith(payload);
    expect(mockListener2).toHaveBeenCalledWith(payload);
  });

  test("should not call listeners of different event types", () => {
    const notificationListener = jest.fn();

    EventEmitter.on("NOTIFICATION", notificationListener);
    EventEmitter.emit("WARNING", { message: "Test warning" });

    expect(notificationListener).not.toHaveBeenCalled();
  });
});
