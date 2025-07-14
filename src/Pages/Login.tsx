

export default function Login() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-600">
            <div className="flex w-[800px] rounded-lg shadow-lg overflow-hidden bg-white">
                
                {/*panel izquierdo*/}

                <div className="w-1/2 bg-cyan-500 p-10 text-white flex flex-col justify-center items-center">
                <h2>IEPC</h2>
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Flogin-png&psig=AOvVaw33RwpQOio8QvT9TOqinnRJ&ust=1752598047329000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIiUtcDpvI4DFQAAAAAdAAAAABAE"  className="w-40 mb-4"></img>
                <p className="text-center text-sm">
                    Instituto Electoral y de Participación Ciudadana del Estado de Durango
                    </p> 
                </div>

                {/*Panel derecho*/}
                <div className="w-1/2 p-10 flex flex-col justify-center">
                <h2 className="text-2x1 font-bold text-cyan-600 mb-6 text-center">Iniciar sesión</h2>
                <form className="space-y-4">
                    <div>
                        <input type="text" placeholder="Usuario o Email institucional"
                        className="w-full border-b border-cyan-300 focus:outline-none focus:border-cyan-600 p-2 placeholder:-cyan-600">
                        </input>
                    </div>

                    <div>
                        <input type="password" placeholder="Contraseña"
                        className="w-full border-b border-cyan-300 focus:outline-none focus:border-cyan-600 p-2 placeholder-cyan-600">
                        </input>
                    </div>

                    <button type="submit" className="w-full bg-cyan-500 text-white font-semibold py-2 rounded shadow hover:bg-cyan-600 transition">
                        Iniciar Sesión 
                    </button>
                </form>


                </div>


                </div> 
        </div>
    )
}