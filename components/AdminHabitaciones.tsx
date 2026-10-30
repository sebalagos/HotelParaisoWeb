"use client";
import { useEffect, useState } from "react";
import { Habitacion, listarHabitaciones, crearHabitacion, actualizarHabitacion, eliminarHabitacion } from "@/lib/api";

export default function AdminHabitaciones() {
  const [lista, setLista] = useState<Habitacion[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");

  const cargar = () => listarHabitaciones().then(setLista).catch(() => setError("No se pudo conectar con la API (puerto 3001)"));
  useEffect(() => { cargar(); }, []);

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !precio.trim()) { setError("Completa nombre y precio"); return; }
    setError("");
    await crearHabitacion({ nombre, precio, capacidad: "2 personas", imagen: "/imagenes/estrandar.jpg" });
    setNombre(""); setPrecio(""); cargar();
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={agregar} className="row g-2 mb-4">
        <div className="col-12 col-md-5"><input className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
        <div className="col-12 col-md-4"><input className="form-control" placeholder="$50.000" value={precio} onChange={(e) => setPrecio(e.target.value)} /></div>
        <div className="col-12 col-md-3"><button className="btn btn-success w-100" type="submit">Agregar</button></div>
      </form>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Nombre</th><th>Precio</th><th>Oferta</th><th>Acciones</th></tr></thead>
          <tbody>
            {lista.map((h) => (
              <tr key={h.id}>
                <td>{h.nombre}</td><td>{h.precio}</td><td>{h.oferta ? "Sí" : "No"}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => actualizarHabitacion(h.id, { oferta: !h.oferta }).then(cargar)}>Cambiar oferta</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarHabitacion(h.id).then(cargar)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
