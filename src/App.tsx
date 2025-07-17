import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calendario from './Pages/Calendario'
import Login from './Pages/Login'
import AgendaPage from './Pages/Agenda'


function App() {
  return (
    <BrowserRouter>
      <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/calendario" element={<Calendario/>} />
   <Route path="/calaendario" element={<Calendario />} />
   <Route path="/agenda" element={<AgendaPage />} />

   
      </Routes>
    </BrowserRouter>
  )
}

export default App


