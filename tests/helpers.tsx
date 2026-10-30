import { act } from "react";
import { createRoot } from "react-dom/client";
import type { ReactElement } from "react";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Monta un componente en el DOM real del navegador (Karma) y permite desmontarlo
export function montar(elemento: ReactElement) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const root = createRoot(div);
  act(() => root.render(elemento));
  return { div, desmontar: () => { act(() => root.unmount()); div.remove(); } };
}
