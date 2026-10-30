"use client";
import { useEffect } from "react";

// Carga el JavaScript de Bootstrap (menú hamburguesa) solo en el navegador
export default function BootstrapJs() {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return null;
}
