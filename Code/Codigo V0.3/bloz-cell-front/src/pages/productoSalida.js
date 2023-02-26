/* eslint-disable react/jsx-no-comment-textnodes */
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import React from "react";
import axios from "axios";
import swal from 'sweetalert';
import {Select, MenuItem, FormControl} from "@mui/material"

const url = "http://localhost:3001/api/salida";
const url1 = "http://localhost:3001/api/products";
    
const mostrarAlertaFecha = () => {
  swal({
      title: "¡Ocurrio un error!",
      text: "¡La fecha de ingreso debe ser la actual!",
      icon: "warning",
      buton: "OK!",
  });
}
   
const mostrarAlertaNombre = () => {
  swal({
      title: "¡Ocurrio un error!",
      text: "¡El nombre del vendedor no puede contener numeros!",
      icon: "warning",
      buton: "OK!",
  });
}

const mostrarAlertaCantidad = () => {
  swal({
      title: "¡Ocurrio un error!",
      text: "¡La cantidad no puedo menor a 0!",
      icon: "warning",
      buton: "OK!",
  });
}

class App extends React.Component {post
  //Validacion cantidad solo numero positivos
  handleKeyPress(event) {
    const regex = /^[1-9]\d*$/;
    const inputValue = event.key;
    if (!regex.test(inputValue)) {
      event.preventDefault(); // Cancela la pulsación de tecla si el valor ingresado no es válido
    }
  } 

  //Validar campos vacios
  handleBlur = () => {
     if (!this.state.form.nombreProducto || !this.state.form.nombreVendedor || !this.state.form.fecha || !this.state.form.cantidad || !this.state.form.tipoOferta ) { 
      this.modalCamposVacios();
    } else {
      this.actualizarStock()
      this.postQuery()
      window.location.reload()
    }
  };

  //Validar campos vacios en actualizar
  handleBlurActualizar = () => {
    if (!this.state.form.nombreProducto || !this.state.form.nombreVendedor || !this.state.form.fecha || !this.state.form.cantidad || !this.state.form.tipoOferta ) { 
     this.modalCamposVacios();
   } else {
     this.actualizarStock()
     this.putQuery()
     window.location.reload()
   }
  };

  //Actualizar stock al eliminar
  handleBlurEliminar = () => {
    this.actualizarStockEliminacion(); 
    this.deleteQuery()
  }

  //Estado del data y del form
  state = {
    data: [],
    producto:[],
    nombreProducto: "",
    stock:0,
    precio: 0,
    nombre:"",
    ofertas:[{tipo:"Descuento"},{tipo:"Promocion"}],
    cantidadMaxima: 0,
    productos: {
      idProducto: "",
      nombre: "",
      marca: "",
      modelo: "",
      precio: "",
      caracteristicas: "",
      imagen: "",
      cantidad: "",
      categoria: "",
    },
    form: {
      idProducto: "",
      nombreProducto: "",
      nombreVendedor: "",
      tipoOferta: "",
      fecha: "",
      precio: "",
      cantidad: "",
      total: "",
    },
    errors: {},
    modalInsert: false,
    modalDelete: false,
    modalEdit: false,
    modalCantidad: false,
    modalCamposVacios:false
  };
  
  getQuery = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
        
      })
      .catch((error) => {
        console.log(error.message);
      });
      console.log(this.state.data.data)
  };

  getQueryProducto = () => {
    axios
      .get(url1)
      .then((response) => {
        this.setState({ producto: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
      console.log(this.state.producto.data)
  };

  postQuery = async () => {
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.getQuery();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  putQuery = () => {
    axios
      .put(url + "/" + this.state.form.idProducto, this.state.form)
      .then((response) => {
        this.setState({ modalEdit: false })
        this.getQuery();
        window.location.reload()
      });
  };
  actualizarStock(){
    for(let i=0;i<this.state.producto.length;i++){
      if(this.state.form.nombreProducto === this.state.producto[i].nombre){
        const actualizarProducto = {
          idProducto: this.state.producto[i].idProducto,
          nombre: this.state.producto[i].nombre,
          marca: this.state.producto[i].marca,
          modelo: this.state.producto[i].modelo,
          precio: this.state.producto[i].precio,
          caracteristicas:this.state.producto[i].caracteristicas,
          imagen: this.state.producto[i].imagen,
          cantidad: this.state.producto[i].cantidad-this.state.form.cantidad,
          categoria: this.state.producto[i].categoria,
        };
        axios
          .put(url1 + "/" + actualizarProducto.idProducto, actualizarProducto)
          .then((response) => {
            console.log(response.data);
          });
      }
    }
  }

  actualizarStockEliminacion(){
    for(let i=0;i<this.state.producto.length;i++){
      if(this.state.form.nombreProducto === this.state.producto[i].nombre){
        const actualizarProducto = {
          idProducto: this.state.producto[i].idProducto,
          nombre: this.state.producto[i].nombre,
          marca: this.state.producto[i].marca,
          modelo: this.state.producto[i].modelo,
          precio: this.state.producto[i].precio,
          caracteristicas:this.state.producto[i].caracteristicas,
          imagen: this.state.producto[i].imagen,
          cantidad: this.state.producto[i].cantidad+this.state.form.cantidad,
          categoria: this.state.producto[i].categoria,
        };
        axios
          .put(url1 + "/" + actualizarProducto.idProducto, actualizarProducto)
          .then((response) => {
            console.log(response.data);
          });
      }
    }
  }
  putStockQuery = () => {
    
  };

  deleteQuery = () => {
    axios.delete(url + "/" + this.state.form.idProducto).then((response) => {
      this.setState({ modalDelete: false });
      this.getQuery();
      window.location.reload()
    });
  };

  componentDidMount() {
    this.getQuery();
    this.getQueryProducto();
    //this.handlePositiveIntChange();
  }
  //Formato Fecha
  formatoFecha(fecha){
    var fechaAux = new Date(fecha)
    var dia = fechaAux.getDay();
    var mes = fechaAux.getMonth()+1;
    var anio = fechaAux.getFullYear();
    return dia+"/"+mes+"/"+anio;
  }
 
  // Funcion control cantidad
  controlCantidad(id, cantidad){
    var buttonInsertar = document.getElementById('insertar');
    for(let i=0;i<this.state.producto.length;i++){
      if(id === this.state.producto[i].nombre)
        if(cantidad>this.state.producto[i].cantidad){
        this.setState({cantidadMaxima: this.state.producto[i].cantidad});
        this.modalCantidad();
        buttonInsertar.disabled = true;
      }else{
        buttonInsertar.disabled = false;
        this.setState({precio: this.state.producto[i].precio})
        this.setState({
          form: {
            ...this.state.form,
            precio: this.state.precio,
          },
        })
      }
    }
  }
  // Funcion control cantidad actualizar
  controlCantidadActualizar(id, cantidad){
    var buttonInsertar = document.getElementById('actualizar');
    for(let i=0;i<this.state.producto.length;i++){
      if(id === this.state.producto[i].nombre)
        if(cantidad>this.state.producto[i].cantidad){
        this.setState({cantidadMaxima: this.state.producto[i].cantidad});
        this.modalCantidad();
        buttonInsertar.disabled = true;
      }else{
        buttonInsertar.disabled = false;
        this.setState({precio: this.state.producto[i].precio})
        this.setState({
          form: {
            ...this.state.form,
            precio: this.state.precio,
          },
        })
      }
    }
  }
  

  //Obtener IDproducto
  obtenerIDProducto(nombre){
    for(let j=0;j<this.state.producto.length;j++){
      if(nombre === this.state.producto[j].nombre){
        return this.state.producto[j].idProducto
      }
    }
  }
  //Cambiar precio
  cambiarPrecio(){
    var inputPrecio = document.getElementById('precio');
    inputPrecio.disabled =false;
    for(let j=0;j<this.state.producto.length;j++){
      if(this.state.form.nombreProducto === this.state.producto[j].nombre){
        this.setState({precio: this.state.producto[j].precio})
        this.setState({
          form: {
            ...this.state.form,
            precio: this.state.precio,
          },
        })
      }
    }
    inputPrecio.disabled =true;
  }
  //Controlador de cambios
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
   
    // Validar el campo cantidad con una expresión regular que solo permita números enteros positivos
    if (name === "cantidad" && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
      mostrarAlertaCantidad();
      return; // Si el valor no es válido, detener la ejecución de la función
      
    }
    // Validar nombreVendedor con una expresión regular que solo permita letras
    if (name === "nombreVendedor" && !/^^[a-zA-ZñÑ ]*$/.test(value)) {
      mostrarAlertaNombre();
      //alert('El nombre solo debe contener Letras');
      return; // Si el valor no es válido, detener la ejecución de la función
      
    }
     // Validar la fecha actual
    if (name === "fecha") {
      const currentDate = new Date().toISOString().substr(0, 10);
      if (value !== currentDate) {
        mostrarAlertaFecha();
        //alert("La fecha debe ser la fecha actual");
        return; // Si el valor no es válido, detener la ejecución de la función
      }
    }
    
  
    // Actualizar el estado del componente con el nuevo valor
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };
  // Modal Cantidad
  modalCantidad = () => {
    this.setState({
      modalCantidad: !this.state.modalCantidad,
    });
  };
  //Modal insert
  modalInsert = () => {
    this.setState({
      modalInsert: !this.state.modalInsert,
      form: { ...this.state.form, idProducto: this.state.data.length + 1 },
    });
  };
  // Función para limpiar el formulario
limpiarFormulario = () => {
  this.setState({
      form: {
        idProducto: "",
        nombreProducto: "",
        nombreVendedor: "",
        tipoOferta: "",
        fecha: "",
        precio: "",
        cantidad: "",
        total: "",
      }, 
  });
};

   // Modal Campo vacio
   modalCamposVacios = () => {
    this.setState({
      modalCamposVacios: !this.state.modalCamposVacios,
    });
  };
  modalInsertHide = () => {
    this.setState({
      modalInsert: !this.state.modalInsert,
    });
  };

  //Modal editar
  modalEdit = () => {
    this.setState({
      modalEdit: !this.state.modalEdit,
    });
  };
  modalEditHide = () => {
    this.setState({
      modalEdit: !this.state.modalEdit,
    });
  };

  selectElement = (element) => {
    this.setState({
      form: {
        idProducto: element.idProducto,
        nombreProducto: element.nombreProducto,
        nombreVendedor: element.nombreVendedor,
        tipoOferta: element.tipoOferta,
        fecha: element.fecha,
        precio: element.precio,
        cantidad: element.cantidad,
        total: element.precio*element.cantidad,
      },
    });
  };

  render() {
    const { form } = this.state;
    return (
      <>
      <Container>
      <div class="col-12 text-center">
      <br /><br />
      <h3>Reporte de Salida de Productos</h3>
      </div>
          <br />
          <Button
            className="btn btn-success"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.limpiarFormulario();
              this.modalInsert(0);
            }}
          >
            Agregar Venta
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Producto</th>
                <th>Nombre Vendedor</th>
                <th>Tipo Oferta</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => (
                <tr>
                  <td>{element.idProducto}</td>
                  <td>{element.nombreProducto}</td>
                  <td>{element.nombreVendedor}</td>
                  <td>{element.tipoOferta}</td>
                  <td>{this.formatoFecha(element.fecha)}</td>
                  <td>{element.precio}</td>
                  <td>{element.cantidad}</td>
                  <td>{element.cantidad*element.precio}</td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        this.selectElement(element);
                        this.modalEdit();
                      }}
                    >
                      Editar
                    </Button>
                    {"   "}
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        this.selectElement(element);
                        this.setState({ modalDelete: true });
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal
          isOpen={/*Modal para insertar productos*/ this.state.modalInsert}
        >
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertHide()}
            >
              x
            </span>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">
              <label htmlFor="idProducto">ID</label>
              <input
                className="form-control"
                type="text"
                name="idProducto"
                id="idProducto"
                onChange={this.handleChange}
                value={form.idProducto}
                readOnly
              />
              <br />
              <label htmlFor="nombreProducto">Nombre Producto</label>
              <FormControl fullWidth
              style={{paddingTop: '0px', paddingBottom: '0px'}}>
              <Select
                        fullWidth
                        name='nombreProducto'
                        id="nombreProducto"
                        style={{paddingTop: '0px', paddingBottom: '0px'}}
                        value={this.state.form.nombreProducto}
                        onBlur={()=>this.cambiarPrecio()}
                        onChange={this.handleChange}
                    >
                        {           
                            this.state.producto.map(item => (
                                <MenuItem value={item.nombre} >{item.nombre}</MenuItem>   
                            ))
                        }    
                    </Select>
              </FormControl>
              <br />
              <br />
              <label htmlFor="nombreVendedor">Nombre Vendedor</label>
              <input
                className="form-control"
                type="text"
                name="nombreVendedor"
                pattern="[A-Za-záéíóúñÑüÜ\s]+" 
                id="nombreVendedor"
                value={this.state.form.nombreVendedor}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="tipoOferta">Tipo Oferta</label>
              <FormControl fullWidth>
              <Select
              className="form-control" 
              type="text"
              name="tipoOferta" 
              id="tipoOferta"
              value={this.state.form.tipoOferta}
              onChange={this.handleChange}
              >
                {           
                  this.state.ofertas.map(item1 => (
                  <MenuItem value={item1.tipo}>{item1.tipo}</MenuItem>   
                  ))
                } 
              </Select>
              </FormControl>
              <br />
              <br />
              <label htmlFor="fecha">Fecha</label>
              <input
                className="form-control"
                type="date"
                format='yyyy-MM-dd'
                name="fecha"
                id="fecha"
                value={this.state.form.fecha}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="cantidad">Cantidad</label>
              <input
                className="form-control"
                type="text"
                name="cantidad"
                id="cantidad"
                pattern="^[0-9]*[1-9][0-9]*$"
                onKeyPress={this.handleKeyPress}
                onBlur={()=> this.controlCantidad(form.nombreProducto,form.cantidad)}
                onChange={this.handleChange}

              />
              <br />
              <label htmlFor="precio">Precio</label>
              <input
                className="form-control"
                type="number"
                name="precio"
                id="precio"
                onChange={this.handleChange}
                value={this.state.form.precio}
                readOnly               
              />
              <br />
              <label htmlFor="total">Total</label>
              <input
                className="form-control"
                type="number"
                name="total"
                id="total"
                onChange={this.handleChange}
                value={this.state.form.cantidad*this.state.form.precio}
                //readonly
              />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              type="submit"
              
              className="btn btn-success"
              id="insertar"
              name="insertar"
              onClick={()=>this.handleBlur()}
            >
              Insertar
            </button>

            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertHide()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={/*Modal para editar productos*/ this.state.modalEdit}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalEditHide()}
            >
              x
            </span>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">
            <label htmlFor="idProducto">ID</label>
              <input
                className="form-control"
                type="text"
                name="idProducto"
                id="idProducto"
                onChange={this.handleChange}
                value={form.idProducto}
                readOnly
              />
              <br />
              <label htmlFor="nombre">Nombre</label>
              <input
                className="form-control"
                type="text"
                name='nombreProducto'
                id="nombreProducto"
                value={this.state.form.nombreProducto}
                onChange={this.handleChange}
                readOnly
              />
              <br />
              {/*
              <label htmlFor="nombreProducto">Nombre Producto</label>
              <FormControl fullWidth>
              <Select
                        fullWidth
                        name='nombreProducto'
                        id="nombreProducto"
                        value={this.state.form.nombreProducto}
                        onBlur={()=>this.cambiarPrecio()}
                        onChange={this.handleChange}
                        readOnly
                    >
                        {           
                            this.state.producto.map(item => (
                                <MenuItem value={item.nombre}>{item.nombre}</MenuItem>   
                            ))
                        }    
                    </Select>
              </FormControl>
              */}
              <label htmlFor="nombreVendedor">Nombre Vendedor</label>
              <input
                className="form-control"
                type="text"
                name="nombreVendedor"
                pattern="[A-Za-záéíóúñÑüÜ\s]+" 
                id="nombreVendedor"
                value={this.state.form.nombreVendedor}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="tipoOferta">Tipo Oferta</label>
              <FormControl fullWidth>
              <Select
              className="form-control" 
              type="text"
              name="tipoOferta" 
              id="tipoOferta"
              value={this.state.form.tipoOferta}
              onChange={this.handleChange}
              >
                {           
                  this.state.ofertas.map(item1 => (
                  <MenuItem value={item1.tipo}>{item1.tipo}</MenuItem>   
                  ))
                } 
              </Select>
              </FormControl>
              <br />
              <br />
              <label htmlFor="fecha">Fecha</label>
              <input
                className="form-control"
                type="date"
                format='yyyy-MM-dd'
                name="fecha"
                id="fecha"
                onChange={this.handleChange}
                value={form.fecha}
                readOnly
              />
              <br />
              <label htmlFor="cantidad">Cantidad</label>
              <input
                className="form-control"
                type="text"
                name="cantidad"
                id="cantidad"
                onChange={this.handleChange}
                value={form.cantidad}
                readOnly
              />
              <br />
              <label htmlFor="precio">Precio</label>
              <input
                className="form-control"
                type="number"
                name="precio"
                id="precio"
                onChange={this.handleChange}
                value={form.precio}
                readOnly               
              />
              <br />
              <label htmlFor="total">Total</label>
              <input
                className="form-control"
                type="number"
                name="total"
                id="total"
                onChange={this.handleChange}
                value={form.total}
                readonly
              />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            <button 
              className="btn btn-primary" 
              id="actualizar"
              name="actualizar"
              onClick={()=>this.handleBlurActualizar()}
              >
              Actualizar
            </button>

            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalEdit: false })}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
            Estás seguro que deseas eliminar {form && form.nombreProducto}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={()=>this.handleBlurEliminar()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalDelete: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalCantidad}>
          <ModalBody>
            La cantidad de stock es de: {this.state.cantidadMaxima}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalCantidad: false })}
            >
              Ok
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalCamposVacios}>
          <ModalBody>
           Error: Existen campos vacio en el formulario.
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalCamposVacios: false })}
            >
              Ok
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
