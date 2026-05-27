const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      // If a relative import ends with '.js', try resolving it as-is first.
      // If it fails, fallback by stripping the '.js' extension and letting Metro resolve it using sourceExts.
      // This bypasses a known Metro resolver bug on Windows with explicit file extensions.
      if (moduleName.endsWith('.js') && (moduleName.startsWith('./') || moduleName.startsWith('../'))) {
        try {
          return context.resolveRequest(context, moduleName, platform);
        } catch (error) {
          const cleanModuleName = moduleName.slice(0, -3);
          return context.resolveRequest(context, cleanModuleName, platform);
        }
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
