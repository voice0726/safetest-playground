import { setup } from "safetest/setup";

setup({
  bootstrappedAt: require.resolve("./app/layout.tsx"),
  ciOptions: {
    usingArtifactsDir: "artifacts",
  },
});
