import './App.css'
import { Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import ProductoSalida from './pages/productoSalida';
import IngresoProducto from './pages/ingresoProducto';
function App(){
  return(
    <div>
      <h1>BLOZ CELL</h1>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='/productoSalida' element={<ProductoSalida/>}/>
          <Route path='/productos' element={<IngresoProducto/>}/>
        </Route>
      </Routes>
    </div>
  )
}
export default App;