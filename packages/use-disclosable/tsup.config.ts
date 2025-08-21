import { defineConfig } from "tsup";
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';

export default defineConfig({
    entryPoints: ["lib/main.ts"],
    format: ["cjs", "esm"],
    external: ["react", "react-dom", "react/jsx-runtime"],
    dts: true,
    outDir: "dist",
    clean: true,
    esbuildPlugins: [
        preserveDirectivesPlugin({
            directives: ['use client', 'use strict'],
            include: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
        })
    ]
});
