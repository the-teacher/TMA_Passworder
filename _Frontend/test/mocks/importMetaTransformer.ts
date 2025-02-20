export default {
  path: "ts-jest-mock-import-meta",
  options: {
    metaObjectReplacement: {
      env: {
        VITE_DEFAULT_LANGUAGE: "en"
      },
      url: "https://www.url.com"
    }
  }
};
