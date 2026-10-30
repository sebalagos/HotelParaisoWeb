const Contacto = () => {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-2">Contacto</h2>
            <p className="mb-4">Estos son nuestros datos de contacto.</p>
            <table className="w-full border border-zinc-400">
                <caption className="mb-2">Datos de contacto - Hotel Paraíso</caption>
                <thead>
                    <tr className="bg-zinc-200 text-zinc-900">
                        <th className="p-2 text-left">Medio</th>
                        <th className="p-2 text-left">Dato</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">Teléfono</td>
                        <td className="p-2">+56 9 1234 5678</td>
                    </tr>
                    <tr className="bg-zinc-100 text-zinc-900">
                        <td className="p-2">Correo</td>
                        <td className="p-2">contacto@hotelparaiso.cl</td>
                    </tr>
                    <tr>
                        <td className="p-2">Dirección</td>
                        <td className="p-2">Av. Paraíso 123, Chile</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Contacto;
