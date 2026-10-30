import { montar } from "./helpers";
import GridHabitaciones from "@/components/GridHabitaciones";
import TarjetaHabitacion from "@/components/TarjetaHabitacion";
import type { Habitacion } from "@/lib/api";

const suite: Habitacion = { id: "2", nombre: "Habitación Suite", precio: "$92.000", capacidad: "2 personas", imagen: "/imagenes/suite.jpg", oferta: true };
const estandar: Habitacion = { id: "1", nombre: "Habitación Estándar", precio: "$45.000", capacidad: "2 personas", imagen: "/imagenes/estrandar.jpg" };

describe("TarjetaHabitacion", () => {
  it("recibe las props y muestra nombre, precio y capacidad", () => {
    const { div, desmontar } = montar(<TarjetaHabitacion habitacion={estandar} />);
    expect(div.querySelector("h2")?.textContent).toBe("Habitación Estándar");
    expect(div.textContent).toContain("$45.000");
    expect(div.textContent).toContain("2 personas");
    desmontar();
  });
  it("muestra la etiqueta Oferta solo cuando oferta es true", () => {
    const a = montar(<TarjetaHabitacion habitacion={suite} />);
    const b = montar(<TarjetaHabitacion habitacion={estandar} />);
    expect(a.div.querySelector(".badge")).not.toBeNull();
    expect(b.div.querySelector(".badge")).toBeNull();
    a.desmontar(); b.desmontar();
  });
  it("el enlace de detalle apunta a /habitaciones/<id>", () => {
    const { div, desmontar } = montar(<TarjetaHabitacion habitacion={suite} />);
    expect(div.querySelector("a")?.getAttribute("href")).toBe("/habitaciones/2");
    desmontar();
  });
});

describe("GridHabitaciones", () => {
  it("renderiza una tarjeta por cada habitación", () => {
    const { div, desmontar } = montar(<GridHabitaciones habitaciones={[suite, estandar]} />);
    expect(div.querySelectorAll(".card").length).toBe(2);
    desmontar();
  });
  it("usa columnas de Bootstrap para ser responsivo", () => {
    const { div, desmontar } = montar(<GridHabitaciones habitaciones={[suite]} />);
    expect(div.querySelector(".col-12.col-md-6.col-lg-3")).not.toBeNull();
    desmontar();
  });
  it("muestra el mensaje de vacío cuando no hay habitaciones", () => {
    const { div, desmontar } = montar(<GridHabitaciones habitaciones={[]} vacio="Por ahora no hay ofertas." />);
    expect(div.textContent).toContain("Por ahora no hay ofertas.");
    desmontar();
  });
});
