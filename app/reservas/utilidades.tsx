export type Habitacion = {
    id: string;
    nombre: string;
};

export type Reserva = {
    id?: string;
    nombre: string;
    run: string;
    llegada: string;
    salida: string;
    personas: string;
    tipo: string;
};

// De 2026-09-10 a 10/09/2026
export function formatearFecha(fecha: string) {
    const partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Quita puntos y espacios, y deja la K en mayúscula
export function normalizarRun(run: string) {
    return run.replace(/\./g, "").replace(/\s/g, "").toUpperCase();
}

export function validarNombre(nombre: string) {
    return isNaN(Number(nombre));
}

export function validarRun(run: string) {
    return /^\d{7,8}-[\dK]$/.test(normalizarRun(run));
}

export function validarFechas(llegada: string, salida: string) {
    if (llegada === "" || salida === "") {
        return false;
    }
    return salida > llegada;
}

// Muestra las fechas ocupadas de la habitación elegida
export function FechasOcupadas({ reservas, tipo }: { reservas: Reserva[]; tipo: string }) {
    const ocupadas = reservas
        .filter(reserva => reserva.tipo === tipo)
        .sort((a, b) => a.llegada.localeCompare(b.llegada));

    if (ocupadas.length === 0) {
        return <p className="text-green-700 my-3">Esta habitación está libre en todas las fechas.</p>;
    }

    return (
        <div className="my-3">
            <p className="text-red-600">Fechas ocupadas de {tipo}:</p>
            <ul className="list-disc ml-6">
                {ocupadas.map(reserva => (
                    <li key={reserva.id}>
                        Ocupada del {formatearFecha(reserva.llegada)} al {formatearFecha(reserva.salida)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Aviso cuando el Run ya tiene reservas
export function AvisoReservas({ previas, onSi, onNo }: {
    previas: Reserva[];
    onSi: () => void;
    onNo: () => void;
}) {
    return (
        <div className="bg-sky-100 text-sky-900 border border-sky-300 rounded p-4">
            <strong>
                Este Run ya tiene {previas.length === 1 ? "una reserva" : previas.length + " reservas"}:
            </strong>
            <ul className="list-disc ml-6 my-2">
                {previas.map(reserva => (
                    <li key={reserva.id}>
                        {reserva.tipo}, del {formatearFecha(reserva.llegada)} al {formatearFecha(reserva.salida)}
                    </li>
                ))}
            </ul>
            <p className="mb-2">¿Quieres hacer otra reserva en otros días o en otra habitación?</p>
            <button
                type="button"
                onClick={onSi}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded mr-2"
            >
                Sí, reservar otra
            </button>
            <button
                type="button"
                onClick={onNo}
                className="bg-zinc-500 hover:bg-zinc-600 text-white py-1 px-3 rounded"
            >
                No, gracias
            </button>
        </div>
    );
}

