module.exports = function (api) {
  api.cache(true); // Cache da configuração para melhor performance

  return {
    presets: [
      "babel-preset-expo", // Preset padrão do Expo
    ],
    plugins: [
      // Plugins essenciais para resolver seu erro
      "@babel/plugin-proposal-optional-chaining", // Para Optional Chaining (?.)
      "@babel/plugin-proposal-nullish-coalescing-operator", // Para Nullish Coalescing (??)

      // Plugin do dotenv com configuração correta
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],

      // Plugins recomendados para React Native
      "react-native-reanimated/plugin", // Necessário para react-native-reanimated

      // Transformações adicionais
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-class-properties", { loose: true }],

      // Otimizações
      ["babel-plugin-transform-remove-console", { exclude: ["error", "warn"] }],
    ],
    env: {
      production: {
        plugins: [
          "transform-remove-console", // Remove consoles apenas em produção
        ],
      },
    },
  };
};
