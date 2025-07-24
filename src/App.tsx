//import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendario from './Pages/Calendario';
import Login from './Pages/Login';
import AgendaPage from './Pages/Agenda';
import Sidebar from '@/components/ui/layout/Sidebar';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Sidebar />}>
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/agenda" element={<AgendaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
