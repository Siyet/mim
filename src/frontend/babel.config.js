module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/react',
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      { "legacy": true },
    ],
  ],
};
