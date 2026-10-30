import FormularioReserva from "./FormularioReserva";

export default function Reservas() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-2">Reserva tu habitación</h2>
            <p className="mb-4">Completa el formulario con tus datos para reservar en Hotel Paraíso.</p>
            <FormularioReserva />
        </div>
    )
}
