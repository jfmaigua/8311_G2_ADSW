import '../App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const URI = "http://localhost:3001/api/salida/"; 
function BusquedaProducto() {

  const [productos, setProducto]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

const peticionGet=async()=>{
  await axios.get(URI)
  .then(response=>{
    setProducto(response.data.data);
    setTablaUsuarios(response.data.data);
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.nombreProducto.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setProducto(resultadosBusqueda);
}

const formatoFecha=(fecha)=>{
  var fechaAux = new Date(fecha)
  var dia = fechaAux.getDay();
  var mes = fechaAux.getMonth()+1;
  var anio = fechaAux.getFullYear();
  return dia+"/"+mes+"/"+anio;
}

useEffect(()=>{
peticionGet();
},[])

  return (
    <div className="App" class="bg-light">
    <br /><br />
  <div class="col-12 text-center">
  <h3>Reporte de Salida de Productos</h3>
      
    </div> 
    <br /><br /> 
      <div class="container">
        <input
          className="form-control"
          value={busqueda}
          placeholder="Buscar un producto por Nombre"
          onChange={handleChange}
        />
        <br /> 
       <table className="table ">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre Producto</th>
                <th>Nombre Vendedor</th>
                <th>Fecha</th>
                <th>Oferta</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                </tr>
            </thead>

         <tbody>
           {productos && 
           productos.map((productos)=>(
             <tr key={productos._id}>
                <td>{productos.idProducto}</td>
                <td>{productos.nombreProducto}</td>
                <td>{productos.nombreVendedor}</td>
                <td>{formatoFecha(productos.fecha)}</td>
                <td>{productos.tipoOferta}</td>
                <td>{productos.precio}</td>
                <td>{productos.cantidad}</td>
                <td>{productos.precio*productos.cantidad}</td>
             </tr>
           ))}
         </tbody>

       </table>

     </div>
    </div>
  );
}

export default BusquedaProducto;