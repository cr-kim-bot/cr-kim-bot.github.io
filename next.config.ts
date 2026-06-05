import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

// Detect dev vs build via the Next.js phase, not `process.argv`. Under Next 16
// (Turbopack) the config is evaluated in the `start-server.js` worker whose
// argv no longer contains "dev", so argv sniffing silently disabled Velite's
// watcher in `next dev`. The phase argument is the version-stable signal.
function startVelite(phase: string) {
  if (process.env.VELITE_STARTED) {
    return;
  }

  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isBuild = phase === PHASE_PRODUCTION_BUILD;

  if (!isDev && !isBuild) {
    return;
  }

  process.env.VELITE_STARTED = "1";
  import("velite").then((velite) =>
    velite.build({ watch: isDev, clean: !isDev }),
  );
}

export default function config(phase: string): NextConfig {
  startVelite(phase);
  return nextConfig;
}
