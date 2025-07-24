import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Calendario from './Pages/Calendario'
import Login from './Pages/Login'
import Login2 from './Pages/Login2'
import AgendaPage from './Pages/Agenda'


function App() {
  return (

    <BrowserRouter>
      <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/login" element={<Login2 />} />
   <Route path="/calendario" element={<Calendario/>} />
   <Route path="/agenda" element={<AgendaPage />} />

   
      </Routes>
    </BrowserRouter>
  )
}

export default App


