"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onMatch: () => void) {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expectedKey = KONAMI_CODE[input.length].toLowerCase();

      if (key === expectedKey) {
        const nextInput = [...input, e.key];
        if (nextInput.length === KONAMI_CODE.length) {
          onMatch();
          setInput([]);
        } else {
          setInput(nextInput);
        }
      } else {
        // Reset check: if the key matches the first key of Konami Code, start over, otherwise clear
        const firstExpected = KONAMI_CODE[0].toLowerCase();
        if (key === firstExpected) {
          setInput([e.key]);
        } else {
          setInput([]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, onMatch]);
}
