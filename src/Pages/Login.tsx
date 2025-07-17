import { FiUser, FiLock } from 'react-icons/fi'

export default function Login() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#e0e0e0]">
            <div className="flex w-[1250px] rounded-lg shadow-lg overflow-hidden bg-white">
                
                {/*panel izquierdo*/}

               <div className="relative w-1/2 h-[700px] bg-[#ffffff] overflow-hidden text-white flex flex-col justify-center items-center p-10">
  
  

 {/*<div className="absolute bottom-130 left-125 w-0 h-0 border-r-[180px] border-r-[#a7a3a3] border-b-[180px] border-b-transparent z-0" />*/}


  <div className="z-10 text-center">
    <h2 className="text-3xl font-bold mb-4">IEPC</h2>
    <div className='flex justify-center '>
    <img
      src="../../public/img/logo.jpeg"
      className="w-500 mb-10 align-center"
    />
    </div>
    
    {/*<p className="text-sm text-black">
      DESARROLLADO POR LA UNIDAD TÉCNICA DE CÓMPUTO
    </p>*/}
  </div>
</div>


                {/*Panel derecho*/}
                <div className="w-1/2 p-20 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-700 mb-20 text-center">Iniciar sesión</h2>
                <form className="space-y-12">
                    
                    <div className='relative'>
                        
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
                        
                        <input type="text" placeholder="Usuario o Email institucional"
                        className="w-full pl-10 border-b border-gray-400 focus:outline-none focus:border-gray-600 p-2 placeholder:-gray-600">
                        </input>
                    </div>

                    <div className='relative'>
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />

                        <input type="password" placeholder="Contraseña"
                        className="w-full pl-10 border-b border-gray-400 focus:outline-none focus:border-gray-600 p-2 placeholder-gray-600">
                        </input>
                    </div>

                    <button type="submit" className="w-full bg-gray-500 text-white font-semibold py-2 rounded shadow hover:bg-gray-600 transition">
                        Iniciar Sesión 
                    </button>
                </form>


                </div>


                </div> 
        </div>
    )
}