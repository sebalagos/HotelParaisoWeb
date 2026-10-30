import { URL_API, listarHabitaciones, crearHabitacion, actualizarHabitacion, eliminarHabitacion } from "@/lib/api";

// Mock de fetch: no se llama a la API real, solo se revisa cómo se usa
function simularFetch(cuerpo: unknown, ok = true) {
  return spyOn(window, "fetch").and.resolveTo(new Response(JSON.stringify(cuerpo), { status: ok ? 200 : 500 }));
}

describe("lib/api (CRUD con json-server en el puerto 3001)", () => {
  it("usa el puerto 3001", () => {
    expect(URL_API).toBe("http://localhost:3001");
  });
  it("listarHabitaciones hace GET a /habitaciones y devuelve los datos", async () => {
    const espia = simularFetch([{ id: "1" }]);
    const datos = await listarHabitaciones();
    expect(espia).toHaveBeenCalledWith(URL_API + "/habitaciones", undefined);
    expect(datos.length).toBe(1);
  });
  it("crearHabitacion hace POST con el cuerpo en JSON", async () => {
    const espia = simularFetch({ id: "9" });
    await crearHabitacion({ nombre: "Nueva", precio: "$1", capacidad: "2 personas", imagen: "/x.jpg" });
    const opciones = espia.calls.mostRecent().args[1] as RequestInit;
    expect(opciones.method).toBe("POST");
    expect(JSON.parse(opciones.body as string).nombre).toBe("Nueva");
  });
  it("actualizarHabitacion hace PATCH y eliminarHabitacion hace DELETE", async () => {
    const espia = simularFetch({});
    await actualizarHabitacion("2", { oferta: false });
    expect((espia.calls.mostRecent().args[1] as RequestInit).method).toBe("PATCH");
    await eliminarHabitacion("2");
    expect((espia.calls.mostRecent().args[1] as RequestInit).method).toBe("DELETE");
  });
  it("lanza un error cuando la API responde con fallo", async () => {
    simularFetch({}, false);
    await expectAsync(listarHabitaciones()).toBeRejected();
  });
});
