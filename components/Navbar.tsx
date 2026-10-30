import Link from "next/link";

const enlaces = [
  ["/", "Inicio"], ["/habitaciones", "Habitaciones"], ["/ofertas", "Ofertas"],
  ["/reservas", "Reservar"], ["/nosotros", "Nosotros"], ["/contacto", "Contacto"], ["/admin", "Admin"],
];

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Hotel Paraíso</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Abrir menú">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            {enlaces.map(([href, texto]) => (
              <li className="nav-item" key={href}><Link className="nav-link" href={href}>{texto}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
