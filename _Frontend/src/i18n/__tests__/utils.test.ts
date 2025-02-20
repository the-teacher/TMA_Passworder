import { mergeDeep } from "../utils";

describe("mergeDeep", () => {
  it("should merge flat objects", () => {
    const target = { a: "value1" };
    const source = { b: "value2" };

    expect(mergeDeep(target, source)).toEqual({ a: "value1", b: "value2" });
  });

  it("should merge nested objects", () => {
    const target = {
      a: { x: "value1" },
      b: "value2"
    };
    const source = {
      a: { y: "value3" },
      c: "value4"
    };

    expect(mergeDeep(target, source)).toEqual({
      a: { x: "value1", y: "value3" },
      b: "value2",
      c: "value4"
    });
  });

  it("should override primitive values", () => {
    const target = { a: "value1" };
    const source = { a: "value2" };

    expect(mergeDeep(target, source)).toEqual({ a: "value2" });
  });

  it("should handle empty objects", () => {
    const target = {};
    const source = { a: "value1" };

    expect(mergeDeep(target, source)).toEqual({ a: "value1" });
  });

  it("should handle deep nested structures", () => {
    const target = {
      translations: {
        app: {
          name: "Old Name"
        }
      }
    };
    const source = {
      translations: {
        app: {
          settings: "Settings"
        }
      }
    };

    expect(mergeDeep(target, source)).toEqual({
      translations: {
        app: {
          name: "Old Name",
          settings: "Settings"
        }
      }
    });
  });
});
