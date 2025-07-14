import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calendario from './Pages/Calendario'
import Login from './Pages/Login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/calaendario" element={<Calendario />} />
   
      </Routes>
    </BrowserRouter>
  )
}

export default App
