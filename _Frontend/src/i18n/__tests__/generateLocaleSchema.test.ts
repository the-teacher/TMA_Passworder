import fs from "fs";
import glob from "glob";
import { generateLocaleSchema } from "../generateLocaleSchema";
import type { PathOrFileDescriptor } from "fs";

// Mock fs and glob modules
jest.mock("fs");
jest.mock("glob", () => ({
  sync: jest.fn().mockReturnValue([]) // Add default return value
}));

// Add type definition at the top
type GenerateLocaleSchema = {
  (sourcePath: string, outputPath: string): Promise<void>;
  (): Promise<void>;
};

// Cast the imported function to the overloaded type
const generateLocaleSchemaTyped = generateLocaleSchema as GenerateLocaleSchema;

describe("generateLocaleSchema", () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockGlob = glob.sync as jest.Mock;
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
  const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, "cwd").mockReturnValue("/test");

    // Add default mock implementations
    mockFs.existsSync.mockReturnValue(false);
    mockFs.mkdirSync.mockImplementation(() => undefined);
    mockFs.writeFileSync.mockImplementation(() => undefined);
    mockFs.readFileSync.mockReturnValue("{}");
  });

  afterEach(() => {
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
  });

  it("should generate schema files for multiple locales", async () => {
    const mockLocaleFiles = [
      "/test/src/__locales__/en.json",
      "/test/src/__locales__/ru.json"
    ];

    mockGlob.mockReturnValue(mockLocaleFiles);

    const mockEnContent = {
      translations: {
        app: { name: "TestApp" }
      }
    };

    const mockRuContent = {
      translations: {
        app: { name: "ТестПрограмма" }
      }
    };

    mockFs.readFileSync.mockImplementation((filePath: PathOrFileDescriptor) => {
      if (filePath.toString().includes("en.json")) {
        return JSON.stringify(mockEnContent);
      }
      if (filePath.toString().includes("ru.json")) {
        return JSON.stringify(mockRuContent);
      }
      return "{}";
    });

    await generateLocaleSchema("./src", "./dist/locales");

    expect(mockFs.mkdirSync).toHaveBeenCalledWith("/test/dist/locales", {
      recursive: true
    });

    expect(mockFs.writeFileSync).toHaveBeenCalledTimes(2);
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      "/test/dist/locales/locales.schema.en.json",
      JSON.stringify(mockEnContent, null, 2),
      "utf-8"
    );
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      "/test/dist/locales/locales.schema.ru.json",
      JSON.stringify(mockRuContent, null, 2),
      "utf-8"
    );

    // Verify console messages
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "Generated locale schema for en at /test/dist/locales/locales.schema.en.json"
    );
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "Generated locale schema for ru at /test/dist/locales/locales.schema.ru.json"
    );
  });

  it("should throw error if paths are not provided", async () => {
    const error = "Both sourcePath and outputPath are required";

    await expect(generateLocaleSchemaTyped()).rejects.toThrow(error);
    expect(mockConsoleError).toHaveBeenCalledWith(error);
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it("should handle empty locale files", async () => {
    mockGlob.mockReturnValue(["/test/src/__locales__/en.json"]);
    mockFs.readFileSync.mockReturnValue("{}");
    mockFs.existsSync.mockReturnValue(false);

    await generateLocaleSchemaTyped("./src", "./dist/locales");

    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      "/test/dist/locales/locales.schema.en.json",
      JSON.stringify({}, null, 2),
      "utf-8"
    );
  });

  it("should merge multiple files for same locale", async () => {
    const mockLocaleFiles = [
      "/test/src/module1/__locales__/en.json",
      "/test/src/module2/__locales__/en.json"
    ];

    mockGlob.mockReturnValue(mockLocaleFiles);

    const module1Content = {
      module1: { key: "value1" }
    };

    const module2Content = {
      module2: { key: "value2" }
    };

    mockFs.readFileSync.mockImplementation((filePath: PathOrFileDescriptor) => {
      if (filePath.toString().includes("module1")) {
        return JSON.stringify(module1Content);
      }
      return JSON.stringify(module2Content);
    });

    mockFs.existsSync.mockReturnValue(false);

    await generateLocaleSchemaTyped("./src", "./dist/locales");

    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      "/test/dist/locales/locales.schema.en.json",
      JSON.stringify(
        {
          module1: { key: "value1" },
          module2: { key: "value2" }
        },
        null,
        2
      ),
      "utf-8"
    );
  });
});
