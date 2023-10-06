import { build } from "esbuild";
import tsPaths from "esbuild-ts-paths";

await build({
  entryPoints: ["api/functions/trpc.ts"],
  bundle: true,
  platform: "node",
  target: ["node10.4"],
  outfile: "functions/trpc.js",
  packages: "external",
  plugins: [tsPaths()],
})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
