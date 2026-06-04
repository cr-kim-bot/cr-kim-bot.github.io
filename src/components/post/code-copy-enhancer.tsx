"use client";

import { useEffect } from "react";

export function CodeCopyEnhancer() {
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLPreElement>("pre"));

    for (const block of blocks) {
      if (block.dataset.copyReady === "true") {
        continue;
      }

      block.dataset.copyReady = "true";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-button";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        const code = block.querySelector("code")?.textContent ?? "";
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1200);
      });

      block.append(button);
    }
  }, []);

  return null;
}
