import './App.css'
import { Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import ProductoSalida from './pages/productoSalida';
import IngresoProducto from './pages/ingresoProducto';
import ReporteGanancia from './pages/reporteGanancia';
import ReportesSalida from './pages/reportesSalida';
import Logo from './img/logo1.png';
function App(){
  return(
    <div className="App" class="bg-light">
      <div style={{
      display: 'flex',
      justifyContent: 'center'
      }}>
        <img src={Logo} alt="Descripción de la imagen" 
        style={{
          alignContent:'center',
          maxWidth: '400px',
          height: 'auto',
          maxHeight: '400px',
        }}/>
      </div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='/productoSalida' element={<ProductoSalida/>}/>
          <Route path='/productos' element={<IngresoProducto/>}/>
          <Route path='/reportesSalida' element={<ReportesSalida/>}/>
          <Route path='/reporteGanancia' element={<ReporteGanancia/>}/>
        </Route>
      </Routes>
    </div>
  )
}
export default App;