import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey via-yellow-90 to-pink-0 flex items-center justify-center py-12 px-4"
    style={{backgroundColor: "#fff7e0"}}
    >
      <div className="w-full max-w-lg">
        {/* Botón de regreso */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Inicio
        </Link>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5975/5975441.png"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold" style={{ color: "#b19671ff" }}>PETCONNECT</h1>
            <h2 className="text-2xl font-bold text-slate-gray dark:text-white mt-4">¡Hola de nuevo!</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4"> Inicia sesión en tu cuenta </p>
          </div>

          {/* Contenido del formulario */}
          <div className="p-8">
            <form className="space-y-6">
              {/* Correo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition border-gray-300"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <MdVisibilityOff size={22} />
                    ) : (
                      <MdVisibility size={22} />
                    )}
                  </button>
                </div>
              </div>

              {/* Botón de inicio */}
              <Link
                to="/dashboard"
                className="block w-full text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all text-center" style={{ backgroundColor: "#b19671ff" }}
              >
                Iniciar Sesión
              </Link>
            </form>

            {/* Separador */}
            {/* <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div> */}

            {/* Botón Google */}
            {/* <button className="w-full mt-6 flex items-center justify-center border py-3 rounded-lg font-semibold hover:bg-gray-50 transition gap-2">
              <img
                className="w-5"
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
              />
              Continuar con Google
            </button> */}

            {/* Enlace olvidé mi contraseña */}
            <div className="mt-6 text-sm text-center">
              <Link
                to="/forgot/id"
                className="text-primary font-semibold hover:text-primary/80 transition"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Enlace registro */}
            <div className="mt-6 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-primary font-bold hover:text-primary/80 transition" style={{ color: "#b19671ff" }}
              >
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
