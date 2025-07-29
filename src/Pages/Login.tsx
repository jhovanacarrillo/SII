import { useEffect, useState } from "react";

import { IconUser, IconLock } from '@tabler/icons-react';
import { IconSunHigh, IconMoon } from '@tabler/icons-react';

export default function Login() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    setTheme(initial);

    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      
      <img
        src={theme === "dark" ? "../../public/img/iepc-darks.jpg" : "../../public/img/img_iepc.jpg"}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

    
    <div className="absolute inset-0 bg-black/20 dark:bg-black/10 z-10 transition-colors duration-500"></div>


      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-20 text-white dark:text-gray-200 hover:text-yellow-300 transition"
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? <IconSunHigh stroke={2} /> : <IconMoon stroke={2} />}
      </button>

     
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-50 rounded-lg shadow-lg p-15 w-full max-w-145 text-gray-800 dark:text-white">
         
          <div className="flex justify-center mb-6">
  <div className="w-30 h-30 rounded-full bg-transparent flex items-center justify-center shadow-md">
   <img
      src="../../public/img/LOGO2023.svg"
      alt="Logo"
      className={`w-30 h-30 object-contain transition duration-300 
        ${theme === "dark" ? "brightness-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]" : ""}`}
    />
  </div>
</div>


          <h2 className="text-3xl font-bold text-center mb-10">Iniciar sesión</h2>

          {/*<form className="space-y-6" >*/}
            <form className="space-y-6 flex flex-col items-center w-full max-w-sm mx-auto">

            <div className="relative">
              <IconUser stroke={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-neutral-200" />
              <input
                type="text"
                placeholder="Usuario o Email institucional"
                className="w-sm pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500
                  bg-white text-gray-800 placeholder-gray-500
                  dark:bg-neutral-950 dark:border-neutral-300 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <IconLock stroke={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-200" />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-sm pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500
                  bg-white text-gray-800 placeholder-gray-500
                  dark:bg-neutral-950 dark:border-neutral-300 dark:text-white dark:placeholder-gray-400 items-center" 
              />
            </div>

            <button
              type="submit"
              className="w-sm bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-800 transition
              dark:bg-neutral-900
              "
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
