import Link from "next/link";

function Tarjeta({ titulo, texto, enlace, textoEnlace }: {
  titulo: string;
  texto: string;
  enlace: string;
  textoEnlace: string;
}) {
  return (
    <div className="border border-zinc-300 rounded p-6 text-center hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{titulo}</h2>
      <p className="mb-4">{texto}</p>
      <Link href={enlace} className="underline text-green-700">{textoEnlace}</Link>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <div
        className="bg-cover bg-center text-white text-center py-24 px-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/imagenes/presidencial.jpg')",
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Bienvenido a Hotel Paraíso</h1>
        <p className="text-xl mb-6">Un descanso tranquilo, cerca de todo lo que buscas.</p>
        <Link
          href="/reservas"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        >
          Reservar ahora
        </Link>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
        <Tarjeta
          titulo="Habitaciones"
          texto="Conoce los tipos de habitación disponibles y sus precios."
          enlace="/habitaciones"
          textoEnlace="Ver habitaciones"
        />
        <Tarjeta
          titulo="Reservar"
          texto="Completa el formulario de reserva con tus datos y fechas."
          enlace="/reservas"
          textoEnlace="Ir a reservar"
        />
        <Tarjeta
          titulo="Contacto"
          texto="Encuentra nuestro teléfono, correo y dirección."
          enlace="/contacto"
          textoEnlace="Ver contacto"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <h3 className="text-lg font-bold mb-2">Pasos para reservar</h3>
        <ol className="list-decimal ml-6">
          <li>Revisa las habitaciones disponibles</li>
          <li>Completa el formulario de reserva con tu Run y tus datos</li>
          <li>Espera la confirmación de tu reserva</li>
        </ol>
      </div>
    </div>
  );
}
