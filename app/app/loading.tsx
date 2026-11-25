// Exibido instantaneamente durante a troca de página, enquanto os dados são buscados no servidor
export default function Loading() {
    return (
        <div className="grid gap-4 animate-pulse" aria-busy="true" aria-label="Carregando">
            <div className="h-7 w-64 rounded-md bg-muted" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-28 rounded-xl bg-muted" />
                ))}
            </div>
            <div className="h-72 rounded-xl bg-muted" />
        </div>
    );
}
