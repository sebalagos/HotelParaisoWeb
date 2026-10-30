import { listarHabitaciones } from "@/lib/api";
import GridHabitaciones from "@/components/GridHabitaciones";

export const dynamic = "force-dynamic";

// async para poder usar await (igual que en la clase)
export default async function Habitaciones() {
  try {
    const habitaciones = await listarHabitaciones();
    return (
      <main className="container py-4">
        <h2 className="text-center mb-3">Habitaciones disponibles</h2>
        <GridHabitaciones habitaciones={habitaciones} />
      </main>
    );
  } catch {
    return <main className="container py-4"><div className="alert alert-danger">No se pudo conectar con la API (revisa que esté corriendo en el puerto 3001)</div></main>;
  }
}
