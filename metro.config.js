const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// 👇 Aliases modernos para resolver '@/...' e outros
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  // adicione outros aliases conforme precisar
};

// Opcional: watchFolders se você estiver usando monorepo
config.watchFolders = [
  path.resolve(__dirname, 'src')
];

module.exports = config;
