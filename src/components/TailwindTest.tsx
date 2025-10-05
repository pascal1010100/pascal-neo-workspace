export default function TailwindTest() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">T</div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Tailwind Test</div>
        <p className="text-slate-500">Si ves este mensaje con estilos, Tailwind está funcionando correctamente.</p>
        <div className="mt-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Botón de Prueba
          </button>
        </div>
      </div>
    </div>
  );
}
