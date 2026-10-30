"use client";

import { useEffect, useRef } from "react";

type SceneOptions = {
  preset: "meadow" | "bloom" | "dusk" | "highland";
  seed: number;
  pixel?: number;
  sky?: string[];
  sunX?: number;
  sunY?: number;
  huts?: boolean;
  clouds?: string[];
};

type PixelSceneApi = {
  mount: (el: HTMLElement, opts: SceneOptions) => unknown;
  sprite: (el: HTMLElement, name: "bee" | "butterfly" | "bird", opts?: { scale: number }) => unknown;
};

declare global {
  interface Window { PixelScene?: PixelSceneApi }
}

async function loadScene(): Promise<PixelSceneApi> {
  // pixel-scene.js is a browser IIFE that registers window.PixelScene; load it only on the client.
  if (!window.PixelScene) await import("@/lib/pixel-scene.js");
  return window.PixelScene!;
}

/** Procedural 16-bit landscape (Pixel Meadow skill). Paints once per size; static under reduced motion. */
export function Scene({ className = "scene", ...opts }: SceneOptions & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(opts);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    loadScene().then((api) => {
      if (cancelled) return;
      el.replaceChildren(); // StrictMode double-mount guard
      api.mount(el, JSON.parse(key));
    });
    return () => { cancelled = true; };
  }, [key]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}

export function Critter({ name, style }: { name: "bee" | "butterfly" | "bird"; style: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    loadScene().then((api) => { el.replaceChildren(); api.sprite(el, name, { scale: 4 }); });
  }, [name]);
  return <div ref={ref} className="critter" style={style} aria-hidden="true" />;
}
