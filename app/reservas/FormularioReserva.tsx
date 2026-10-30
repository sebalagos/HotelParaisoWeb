"use client";

import { useEffect, useRef, useState } from "react";

import { URL_API } from "@/lib/api";
import { Habitacion, Reserva, formatearFecha, normalizarRun, validarNombre, validarRun, validarFechas, FechasOcupadas, AvisoReservas } from "./utilidades";

export default function FormularioReserva() {
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [errorApi, setErrorApi] = useState(false);

    const [nombre, setNombre] = useState("");
    const [run, setRun] = useState("");
    const [llegada, setLlegada] = useState("");
    const [salida, setSalida] = useState("");
    const [personas, setPersonas] = useState("2");
    const [tipo, setTipo] = useState("");

    const [errorNombre, setErrorNombre] = useState("");
    const [errorRun, setErrorRun] = useState("");
    const [errorFechas, setErrorFechas] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mensajeColor, setMensajeColor] = useState("text-black");

    // Si el cliente ya reservó, esto indica si eligió hacer otra reserva
    const [mostrarAviso, setMostrarAviso] = useState(false);
    const [quiereOtraReserva, setQuiereOtraReserva] = useState(false);

    const llegadaRef = useRef<HTMLInputElement>(null);

    // Al abrir la página se piden las habitaciones y las reservas a la API
    useEffect(() => {
        async function cargarDatos() {
            try {
                const respHab = await fetch(URL_API + "/habitaciones");
                const listaHab: Habitacion[] = await respHab.json();
                const respRes = await fetch(URL_API + "/reservas");
                const listaRes: Reserva[] = await respRes.json();
                setHabitaciones(listaHab);
                setReservas(listaRes);
                if (listaHab.length > 0) {
                    setTipo(listaHab[0].nombre);
                }
            } catch {
                setErrorApi(true);
            }
        }
        cargarDatos();
    }, []);

    function mostrarMensaje(texto: string, color: string) {
        setMensaje(texto);
        setMensajeColor(color);
    }

    // Reservas que ya tiene el Run escrito en el formulario
    const previas = validarRun(run)
        ? reservas.filter(reserva => reserva.run === normalizarRun(run))
        : [];

    // Al ingresar el Run se revisa si ya tiene reservas
    function revisarRun() {
        setQuiereOtraReserva(false);
        setMostrarAviso(previas.length > 0);
    }

    function aceptarOtraReserva() {
        setQuiereOtraReserva(true);
        setMostrarAviso(false);
        mostrarMensaje("Elige las nuevas fechas o la otra habitación y presiona Reservar.", "text-black");
        llegadaRef.current?.focus();
    }

    function limpiar() {
        setNombre("");
        setRun("");
        setLlegada("");
        setSalida("");
        setPersonas("2");
        setTipo(habitaciones.length > 0 ? habitaciones[0].nombre : "");
        setErrorNombre("");
        setErrorRun("");
        setErrorFechas("");
        setMensaje("");
        setMostrarAviso(false);
        setQuiereOtraReserva(false);
    }

    async function reservar() {
        console.log("-- función reservar --");
        console.log("nombre = " + nombre);
        console.log("run = " + run);
        console.log("llegada = " + llegada);
        console.log("salida = " + salida);
        console.log("personas = " + personas);
        console.log("tipo de habitación = " + tipo);

        setMensaje("");

        const nombreValido = validarNombre(nombre);
        setErrorNombre(nombreValido ? "" : "El nombre ingresado no es válido");

        const runValido = validarRun(run);
        setErrorRun(runValido ? "" : "Debes ingresar tu Run, por ejemplo 12345678-9");

        const fechasValidas = validarFechas(llegada, salida);
        setErrorFechas(fechasValidas ? "" : "Elige las fechas, la salida debe ser después de la llegada");

        if (!(nombreValido && runValido && fechasValidas)) {
            return;
        }

        // Se piden de nuevo las reservas para tener los datos al día
        let actuales: Reserva[] = [];
        try {
            const respuesta = await fetch(URL_API + "/reservas");
            actuales = await respuesta.json();
            setReservas(actuales);
        } catch {
            mostrarMensaje("No se pudo conectar con la API. Intenta de nuevo.", "text-red-600");
            return;
        }

        // ¿La habitación ya está ocupada en esas fechas?
        const choque = actuales.find(reserva =>
            reserva.tipo === tipo && llegada < reserva.salida && salida > reserva.llegada
        );
        if (choque) {
            mostrarMensaje(
                tipo + " ya está ocupada del " + formatearFecha(choque.llegada) + " al " + formatearFecha(choque.salida) + ". Elige otras fechas u otra habitación.",
                "text-red-600"
            );
            return;
        }

        // ¿Este Run ya tiene reservas? Se le pregunta antes de seguir
        const runNormal = normalizarRun(run);
        const tieneReservas = actuales.some(reserva => reserva.run === runNormal);
        if (tieneReservas && !quiereOtraReserva) {
            setMostrarAviso(true);
            mostrarMensaje("Elige una opción del aviso antes de reservar.", "text-red-600");
            return;
        }

        const nuevaReserva: Reserva = {
            nombre: nombre,
            run: runNormal,
            llegada: llegada,
            salida: salida,
            personas: personas,
            tipo: tipo,
        };

        try {
            const respuesta = await fetch(URL_API + "/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaReserva),
            });
            const guardada: Reserva = await respuesta.json();
            setReservas([...actuales, guardada]);
        } catch {
            mostrarMensaje("No se pudo guardar la reserva. Intenta de nuevo.", "text-red-600");
            return;
        }

        mostrarMensaje("Reserva enviada, " + nombre + ". Pronto te contactaremos.", "text-green-700");
        setQuiereOtraReserva(false);
        setMostrarAviso(true);
    }

    if (errorApi) {
        return (
            <h2 className="bg-red-100 text-red-500 p-2">
                No se pudo conectar con la API (revisa que esté corriendo en el puerto 3001)
            </h2>
        );
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    reservar();
                }}
                className="border border-zinc-300 rounded p-4"
            >
                <h3 className="text-lg font-bold mb-3">Formulario de Reserva</h3>

                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2 gap-y-3 items-center">
                    <label htmlFor="cnombre">Nombre:</label>
                    <div>
                        <input
                            type="text"
                            id="cnombre"
                            placeholder="Juan Lopez"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="border border-zinc-400 rounded px-2 py-1"
                        />
                        <span className="text-sm text-red-600 ml-2">{errorNombre}</span>
                    </div>

                    <label htmlFor="crun">Run:</label>
                    <div>
                        <input
                            type="text"
                            id="crun"
                            placeholder="12345678-9"
                            value={run}
                            onChange={(e) => setRun(e.target.value)}
                            onBlur={revisarRun}
                            className="border border-zinc-400 rounded px-2 py-1"
                        />
                        <span className="text-sm text-red-600 ml-2">{errorRun}</span>
                    </div>

                    <label htmlFor="cllegada">Fecha de llegada:</label>
                    <div>
                        <input
                            type="date"
                            id="cllegada"
                            ref={llegadaRef}
                            value={llegada}
                            onChange={(e) => setLlegada(e.target.value)}
                            className="border border-zinc-400 rounded px-2 py-1"
                        />
                    </div>

                    <label htmlFor="csalida">Fecha de salida:</label>
                    <div>
                        <input
                            type="date"
                            id="csalida"
                            value={salida}
                            onChange={(e) => setSalida(e.target.value)}
                            className="border border-zinc-400 rounded px-2 py-1"
                        />
                        <span className="text-sm text-red-600 ml-2">{errorFechas}</span>
                    </div>

                    <label htmlFor="cpersonas">Cantidad de personas:</label>
                    <div>
                        <input
                            type="number"
                            id="cpersonas"
                            min="1"
                            value={personas}
                            onChange={(e) => setPersonas(e.target.value)}
                            className="border border-zinc-400 rounded px-2 py-1 w-24"
                        />
                    </div>

                    <label htmlFor="ctipo">Tipo de habitación:</label>
                    <div>
                        <select
                            id="ctipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="border border-zinc-400 rounded px-2 py-1"
                        >
                            {habitaciones.map(habitacion => (
                                <option key={habitacion.id} value={habitacion.nombre}>
                                    {habitacion.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <FechasOcupadas reservas={reservas} tipo={tipo} />

                <button
                    type="button"
                    onClick={limpiar}
                    className="bg-zinc-500 hover:bg-zinc-600 text-white py-2 px-4 rounded mr-2"
                >
                    Limpiar
                </button>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                    Reservar
                </button>
                <span className={"text-sm ml-3 " + mensajeColor}>{mensaje}</span>
            </form>

            {mostrarAviso && previas.length > 0 && (
                <div className="mt-4">
                    <AvisoReservas
                        previas={previas}
                        onSi={aceptarOtraReserva}
                        onNo={limpiar}
                    />
                </div>
            )}
        </div>
    );
}
