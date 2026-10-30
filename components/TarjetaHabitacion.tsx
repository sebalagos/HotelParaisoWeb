import type { Habitacion } from "@/lib/api";

type Props = { habitacion: Habitacion };

export default function TarjetaHabitacion({ habitacion }: Props) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={habitacion.imagen} alt={habitacion.nombre} className="card-img-top" style={{ height: 180, objectFit: "cover" }} />
      <div className="card-body">
        {habitacion.oferta && <span className="badge bg-danger mb-2">Oferta</span>}
        <h2 className="h5 card-title">{habitacion.nombre}</h2>
        <p className="mb-1">Precio por noche: {habitacion.precio}</p>
        <p>Capacidad: {habitacion.capacidad}</p>
        <a href={"/habitaciones/" + habitacion.id} className="btn btn-outline-success btn-sm">Ver detalle</a>
      </div>
    </div>
  );
}
