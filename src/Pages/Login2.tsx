
// import { FiUser, FiLock } from 'react-icons/fi'

// export default function Login() {

//     return (

//         <div className="min-h-screen flex items-center justify-center bg-[#e6dede]">
//             <div className="flex w-[1450px] rounded-lg shadow-lg overflow-hidden bg-white">
                
//                 {/*panel izquierdo*/}

//               {/* Panel izquierdo */}
// <div className="relative w-1/2 h-[700px] bg-[#ffffff] overflow-hidden flex justify-center items-center p-0">
//   <img
//     src="../../public/img/img_iepc.jpg"
//     className="w-full h-full object-cover"
//     alt="IEPC"
//   />
// </div>


//                 {/*Panel derecho*/}
//                 <div className="w-1/2 p-20 flex flex-col justify-center">
//                 <h2 className="text-3xl font-bold text-gray-700 mb-20 text-center">Iniciar sesión</h2>
//                 <form className="space-y-12">
                    
//                     <div className='relative'>
                        
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
                        
//                         <input type="text" placeholder="Usuario o Email institucional"
//                         className="w-full pl-10 border-b border-gray-400 focus:outline-none focus:border-gray-600 p-2 placeholder:-gray-600">
//                         </input>
//                     </div>

//                     <div className='relative'>
//                         <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />

//                         <input type="password" placeholder="Contraseña"
//                         className="w-full pl-10 border-b border-gray-400 focus:outline-none focus:border-gray-600 p-2 placeholder-gray-600">
//                         </input>
//                     </div>

//                     <button type="submit" className="w-full bg-gray-500 text-white font-semibold py-2 rounded shadow hover:bg-gray-600 transition">
//                         Iniciar Sesión 
//                     </button>
//                 </form>


//                 </div>


//                 </div> 
//         </div>
//     )
// }


// import { FiUser, FiLock } from 'react-icons/fi'

// export default function Login() {

//     return (

//         <div className="min-h-screen flex items-center justify-center bg-[#e6dede]">
//             <div className="flex w-[1450px] rounded-lg shadow-lg overflow-hidden bg-white">
                
//                 {/*panel izquierdo*/}

//               {/* Panel izquierdo */}
// <div className="relative w-1/2 h-[700px] bg-[#ffffff] overflow-hidden flex justify-center items-center p-0">
//   <img
//     src="../../public/img/img_iepc.jpg"
//     className="w-full h-full object-cover"
//     alt="IEPC"
//   />
// </div>


//                 {/*Panel derecho*/}
//                 <div className="w-1/2 p-20 flex flex-col justify-center">
//                 <h2 className="text-3xl font-bold text-gray-700 mb-20 text-center">Iniciar sesión</h2>
//                 <form className="space-y-12">
                    
//                     <div className='relative'>
                        
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
                        
//                         <input type="text" placeholder="Usuario o Email institucional"
//                         className="w-full pl-10 border-b border-gray-400 focus:outline-none focus:border-gray-600 p-2 placeholder:-gray-600">
//                         </input>
//                     </div>

//                     <div className='relative'>
//                         <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />

//                         <input type="password" placeholder="Contraseña"
//                         className="w-full pl-10 border-b border-gray-400 focus:outline-none focus:border-gray-600 p-2 placeholder-gray-600">
//                         </input>
//                     </div>

//                     <button type="submit" className="w-full bg-gray-500 text-white font-semibold py-2 rounded shadow hover:bg-gray-600 transition">
//                         Iniciar Sesión 
//                     </button>
//                 </form>


//                 </div>


//                 </div> 
//         </div>
//     )
// }


import { useEffect, useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Login2() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";

  setTheme(initial); 
  document.documentElement.classList.toggle("dark", initial === "dark");
}, []);


  

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center transition-colors duration-300">
      <div className="flex w-full h-full shadow-lg overflow-hidden text-gray-800 dark:text-white relative bg-black">
        {/* Imagen Izquierda */}
       <div  className="hidden md:block md:w-1/2 h-full">
          <img
  src={theme === "dark" ? "../../public/img/iepc-darks.jpg" : "../../public/img/img_iepc.jpg"}
  alt="IEPC"
  className="w-full h-full object-cover"
/>
        </div>

        {/* Botón de tema */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition"
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Formulario Derecho */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
  <div className="w-22 h-22 rounded-full bg-white flex items-center justify-center shadow-md">
    <img
      src={theme === "dark" ? "../../public/img/logo_durango.png" : "../../public/img/logo_durango.png"}
      alt="Logo Durango"
      className="w-18 h-18 object-contain"
    />
  </div>
</div>

            <h2 className="text-3xl font-bold text-center mb-10">
              Iniciar sesión
            </h2>

            <form className="space-y-6">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                {/* <input
                  type="text"
                  placeholder="Usuario o Email institucional"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                /> */}

                <input
  type="text"
  placeholder="Usuario o Email institucional"
  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500
    bg-white text-gray-800 placeholder-gray-500
    dark:bg-white dark:border-gray-700 dark:text-black dark:placeholder-gray-400"
/>
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
  type="password"
  placeholder="Contraseña"
  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500
    bg-white text-gray-800 placeholder-gray-500
    dark:bg-white dark:border-gray-700 dark:text-black dark:placeholder-gray-400"
/>

              </div>


              <button
                type="submit"
                className="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
