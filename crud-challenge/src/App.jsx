import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { UnicornProvider } from './context/UnicornContext';
import UnicornsModule from './layouts/unicorns';
function App() {
  return (
    <UnicornProvider>
      <Router>
        <Routes>
          <Route path="/unicornios" element={<UnicornsModule />} />
          {/* Puedes agregar más rutas aquí si es necesario */}
        </Routes>
      </Router>
    </UnicornProvider>
  );
}


export default App;