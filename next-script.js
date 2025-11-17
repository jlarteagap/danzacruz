#!/usr/bin/env node

// Cargar el loader ESM de ts-node
import "ts-node/register/esm";

const { spawn } = await import("node:child_process");
const path = await import("node:path");

// Obtener el archivo .ts que quieres ejecutar
const script = process.argv[2];
if (!script) {
  console.error("Error: debes especificar un archivo .ts");
  process.exit(1);
}

// Ejecutar el script con Node + loader
const child = spawn(
  process.execPath,
  [
    "--loader",
    "ts-node/esm",
    path.resolve(process.cwd(), script),
    ...process.argv.slice(3),
  ],
  { stdio: "inherit" }
);

child.on("exit", process.exit);
