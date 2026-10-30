import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerHabitacion, Habitacion } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function DetalleHabitacion({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let h: Habitacion;
  try { h = await obtenerHabitacion(id); } catch { notFound(); }
  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-md-6"><img src={h.imagen} alt={h.nombre} className="img-fluid rounded" /></div>
        <div className="col-12 col-md-6">
          <h2>{h.nombre}</h2>
          <p>Precio por noche: {h.precio}</p>
          <p>Capacidad: {h.capacidad}</p>
          <Link href="/reservas" className="btn btn-success">Reservar</Link>
        </div>
      </div>
    </main>
  );
}
