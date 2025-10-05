import TailwindTest from '../components/TailwindTest';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Bienvenido a Pascal Neo</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Tu cómic interactivo está en desarrollo</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <TailwindTest />
      </div>
      
      {/* Sección de verificación de estilos */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Verificación de Estilos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
            <h3 className="font-medium text-lg text-gray-800 dark:text-white">Colores</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="w-8 h-8 rounded bg-blue-500"></div>
              <div className="w-8 h-8 rounded bg-green-500"></div>
              <div className="w-8 h-8 rounded bg-red-500"></div>
              <div className="w-8 h-8 rounded bg-yellow-500"></div>
              <div className="w-8 h-8 rounded bg-purple-500"></div>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
            <h3 className="font-medium text-lg text-gray-800 dark:text-white">Tipografía</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Texto normal</p>
            <p className="font-medium">Texto medio</p>
            <p className="font-bold">Texto en negrita</p>
          </div>
        </div>
      </div>
    </div>
  );
}
