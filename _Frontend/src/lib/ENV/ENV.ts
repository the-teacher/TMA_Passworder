const isViteEnv = (): boolean => {
  // Проверяем глобальную переменную, которая всегда есть в Vite
  return typeof process === "undefined" || Boolean(process.env.VITE);
};

const isNodeEnv = (): boolean => {
  // Explicitly convert to boolean
  return typeof process !== "undefined" && Boolean(process.env);
};

export default {
  isViteEnv,
  isNodeEnv
};
