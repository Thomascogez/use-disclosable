import { defineConfig } from "tsup";

export default defineConfig({
    entryPoints: ["lib/main.ts"],
    format: ["cjs", "esm"],
    external: ["react", "react-dom", "react/jsx-runtime"],
    dts: true,
    outDir: "dist",
    clean: true,
});
