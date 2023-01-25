/* eslint-disable react/jsx-no-comment-textnodes */
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const url = "http://localhost:3001/api/salida/";
function BusquedaProducto() {

const [usuarios, setUsuarios]= useState([]);
const [tablaUsuarios, setTablaUsuarios]= useState([]);
const [busqueda, setBusqueda]= useState("");

const peticionGet=async()=>{
  await axios.get(url)
  .then(response=>{
    setUsuarios(response.data);
    setTablaUsuarios(response.data);
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
  setUsuarios(resultadosBusqueda);
}

useEffect(()=>{
  peticionGet();
},[])

return (
  <div className="App">
    <h3>REPORTE SALIDA DE PRODUCTOS</h3>
    <div className="container">
        <input
          className="form-control"
          value={busqueda}
          placeholder="Search by medicine name"
          onChange={handleChange}
        />
    </div>

   <div className="table-responsive">
     <table className="table">
       <thead>
         <tr>
           <th>ID</th>
           <th>Nombre</th>
           <th>Teléfono</th>
           <th>Nombre de Usuario</th>
           <th>Correo</th>
           <th>Sitio Web</th>
           <th>Ciudad</th>
           <th>Empresa</th>
         </tr>
       </thead>

       <tbody>
         {usuarios && 
         usuarios.map((usuarios)=>(
           <tr key={usuarios.id}>
              <td>{usuarios._id}</td>
              <td>{usuarios.nombreProducto}</td>
              <td>{usuarios.nombreVendedor}</td>
              <td>{usuarios.tipoOferta}</td>
              <td>{usuarios.fecha}</td>
              <td>{usuarios.precio}</td>
              <td>{usuarios.cantidad}</td>
              <td>{usuarios.cantidad*usuarios.precio}</td>
           </tr>
         ))}
       </tbody>

     </table>

   </div>
  </div>
);
}

export default BusquedaProducto;
