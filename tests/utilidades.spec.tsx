import { montar } from "./helpers";
import { formatearFecha, normalizarRun, validarNombre, validarRun, validarFechas, FechasOcupadas, AvisoReservas } from "@/app/reservas/utilidades";

describe("Funciones de validación de la reserva", () => {
  it("formatearFecha convierte 2026-09-10 en 10/09/2026", () => {
    expect(formatearFecha("2026-09-10")).toBe("10/09/2026");
  });
  it("normalizarRun quita puntos y deja la K en mayúscula", () => {
    expect(normalizarRun("12.345.678-k")).toBe("12345678-K");
  });
  it("validarNombre acepta un nombre y rechaza un número", () => {
    expect(validarNombre("Juan Lopez")).toBeTrue();
    expect(validarNombre("12345")).toBeFalse();
  });
  it("validarRun acepta formato 12345678-9", () => {
    expect(validarRun("12345678-9")).toBeTrue();
  });
  it("validarRun rechaza un Run incompleto", () => {
    expect(validarRun("1234")).toBeFalse();
  });
  it("validarFechas acepta salida posterior a la llegada", () => {
    expect(validarFechas("2026-09-10", "2026-09-12")).toBeTrue();
  });
  it("validarFechas rechaza salida anterior o fechas vacías", () => {
    expect(validarFechas("2026-09-12", "2026-09-10")).toBeFalse();
    expect(validarFechas("", "2026-09-10")).toBeFalse();
  });
});

describe("Componentes de la reserva", () => {
  const reservas = [
    { id: "1", nombre: "Ana", run: "11111111-1", llegada: "2026-09-10", salida: "2026-09-12", personas: "2", tipo: "Habitación Suite" },
  ];

  it("FechasOcupadas muestra las fechas ocupadas de la habitación elegida (renderizado con props)", () => {
    const { div, desmontar } = montar(<FechasOcupadas reservas={reservas} tipo="Habitación Suite" />);
    expect(div.textContent).toContain("Ocupada del 10/09/2026 al 12/09/2026");
    desmontar();
  });
  it("FechasOcupadas muestra el mensaje de libre cuando no hay reservas (renderizado condicional)", () => {
    const { div, desmontar } = montar(<FechasOcupadas reservas={reservas} tipo="Suite Presidencial" />);
    expect(div.textContent).toContain("libre en todas las fechas");
    desmontar();
  });
  it("AvisoReservas ejecuta onSi al hacer clic en 'Sí, reservar otra' (evento)", () => {
    const onSi = jasmine.createSpy("onSi");
    const { div, desmontar } = montar(<AvisoReservas previas={reservas} onSi={onSi} onNo={() => {}} />);
    const boton = Array.from(div.querySelectorAll("button")).find((b) => b.textContent?.includes("Sí"))!;
    boton.click();
    expect(onSi).toHaveBeenCalledTimes(1);
    desmontar();
  });
});
