import { listarHabitaciones } from "@/lib/api";
import GridHabitaciones from "@/components/GridHabitaciones";

export const dynamic = "force-dynamic";

export default async function Ofertas() {
  try {
    const todas = await listarHabitaciones();
    return (
      <main className="container py-4">
        <h2 className="text-center mb-3">Habitaciones en oferta</h2>
        <GridHabitaciones habitaciones={todas.filter((h) => h.oferta)} vacio="Por ahora no hay ofertas." />
      </main>
    );
  } catch {
    return <main className="container py-4"><div className="alert alert-danger">No se pudo conectar con la API (puerto 3001)</div></main>;
  }
}
