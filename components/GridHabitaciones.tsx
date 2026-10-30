import type { Habitacion } from "@/lib/api";
import TarjetaHabitacion from "./TarjetaHabitacion";

type Props = { habitaciones: Habitacion[]; vacio?: string };

// Grilla responsiva de Bootstrap: 1 columna en móvil, 2 en tablet, 4 en escritorio
export default function GridHabitaciones({ habitaciones, vacio = "No hay habitaciones para mostrar." }: Props) {
  if (habitaciones.length === 0) return <div className="alert alert-info">{vacio}</div>;
  return (
    <div className="row g-3">
      {habitaciones.map((h) => (
        <div className="col-12 col-md-6 col-lg-3" key={h.id}><TarjetaHabitacion habitacion={h} /></div>
      ))}
    </div>
  );
}
