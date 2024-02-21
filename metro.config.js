const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// TODO: try later
// module.exports = withNativeWind(config, { input: "./src/global.css" });

/**
 * Add support for share.js as a recognized extension to the Metro config.
 * This allows creating an index.share.js entry point for our iOS share extension
 *
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withShareExtension(config) {
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
    resolver: {
      sourceExts: [...config.resolver.sourceExts, "share.js"], // Add 'share.js' as a recognized extension
    },
  });
  return config;
}

// module.exports = withShareExtension(getDefaultConfig(__dirname), {
//   // [Web-only]: Enables CSS support in Metro.
//   isCSSEnabled: true,
// });

module.exports = withShareExtension(
  withNativeWind(config, { input: "./src/global.css" })
);
