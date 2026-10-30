export const obtenerHabitacion = (id: string) =>
  pedir<Habitacion>("/habitaciones/" + id);

export const crearHabitacion = (h: Omit<Habitacion, "id">) =>
  pedir<Habitacion>("/habitaciones", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(h)
  });

export const actualizarHabitacion = (id: string, cambios: Partial<Habitacion>) =>
  pedir<Habitacion>("/habitaciones/" + id, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(cambios)
  });

export const eliminarHabitacion = (id: string) =>
  pedir<unknown>("/habitaciones/" + id, {
    method: "DELETE"
  });