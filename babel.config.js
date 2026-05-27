module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 👇 ADD THIS PLUGINS SECTION
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          // Ensure these match your TypeScript paths! 👇
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@modules': './src/modules',
          '@api': './src/api',
          '@assets': './src/assets',
          '@libs': './src/libs',
          '@store': './src/store',
        },
      },
    ],
    'react-native-reanimated/plugin', // Reanimated plugin must always be listed last
  ],
};