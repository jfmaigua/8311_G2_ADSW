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
import {Select, MenuItem, FormControl} from "@mui/material"

const url = "http://localhost:3001/api/salida";
const url1 = "http://localhost:3001/api/products";

class App extends React.Component {
  //constructor(props) {
    //super(props);
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
    modalInsert: false,
    modalDelete: false,
    modalEdit: false,
    modalCantidad: false
  };
  
  //this.handleChangeInput = this.handleChangeInput.bind(this);
//}
  getQuery = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
      console.log(this.state.data)
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
      console.log(this.state.producto)
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
      });
  };
  putStock = () => {
    let stockActualizar
    for(let i=0;i<this.state.producto.length;i++){
      if(this.state.form.nombreProducto===this.state.producto[i].nombre){
        axios
          .put(url1 + "/" + this.this.state.producto[i].idProducto, this.state.form)
          .then((response) => {
            this.setState({ modalEdit: false })
            this.getQuery();
          });
      }
    }
  };
  deleteQuery = () => {
    axios.delete(url + "/" + this.state.form.idProducto).then((response) => {
      this.setState({ modalDelete: false });
      this.getQuery();
    });
  };
  componentDidMount() {
    this.getQuery();
    this.getQueryProducto();
    
  }
  //Formato Fecha
  formatoFecha(fecha){
    var fechaAux = new Date(fecha)
    var dia = fechaAux.getDay();
    var mes = fechaAux.getMonth()+1;
    var anio = fechaAux.getFullYear();
    return dia+"/"+mes+"/"+anio;
  }
  /*
   handleChangeInput(evento){
    console.log("Hola key")
    //destructurin de los valores enviados por el metodo onchange de cada input
    const { name, value } = evento.target;
    let regex = new RegExp("^[a-zA-Z ]+$");

    if (regex.test(value)) {
      console.log(name, value);
      this.setState({
        //al elemento dentro de [] es una key de cada parametro dentro del
        //estado.
        [name]: value
      });
    } else {
      console.log("es numero");
    }
  }
  */
  // Funcion actualizar stock
  actualizarStock(id,cantidad){
    for(let i=0;i<this.state.producto.length;i++){
      if(id === this.state.producto[i].nombre)
        if(cantidad>this.state.producto[i].cantidad){
        this.setState({cantidadMaxima: this.state.producto[i].cantidad});
        this.modalCantidad();
        //buttonInsertar.disabled = true;
      }else{
        //buttonInsertar.disabled = false;
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

  //Cambiar precio
  cambiarPrecio(){
    for(let j=0;j<this.state.producto.length;j++){
      console.log("nombre1: "+this.state.form.nombreProducto)
      console.log("nombre2:"+this.state.producto[j].nombre)
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
  }
  //Controlador de cambios
  handleChange = (e) => {
    e.stopPropagation()
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form)
    console.log(this.state.ofertas)
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
          <br />
          <Button
            className="btn btn-success"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
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
              <FormControl fullWidth>
              <Select
                        fullWidth
                        name='nombreProducto'
                        id="nombreProducto"
                        value={this.state.form.nombreProducto}
                        onBlur={()=>this.cambiarPrecio()}
                        onChange={this.handleChange}
                    >
                        {           
                            this.state.producto.map(item => (
                                <MenuItem value={item.nombre}>{item.nombre}</MenuItem>   
                            ))
                        }    
                    </Select>
              </FormControl>
              <br />
              <label htmlFor="nombreVendedor">Nombre Vendedor</label>
              <input
                className="form-control"
                type="text"
                name="nombreVendedor"
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
              //onBlur={()=>this.cambiarPrecio()}
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
              <label htmlFor="fecha">Fecha</label>
              <input
                className="form-control"
                type="date"
                format='yyyy-MM-dd'
                name="fecha"
                id="fecha"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="cantidad">Cantidad</label>
              <input
                className="form-control"
                type="number"
                name="cantidad"
                id="cantidad"
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
                value={this.state.precio}                
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
                readonly
              />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="btn btn-success"
              id="insertar"
              name="insertar"
              onClick={() => this.postQuery()}
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
              <label htmlFor="nombreProducto">Nombre Producto</label>
              <FormControl fullWidth>
              <Select
                        fullWidth
                        name='nombreProducto'
                        id="nombreProducto"
                        value={this.state.form.nombreProducto}
                        onChange={this.handleChange}
                    >
                        {
                            this.state.producto.map(item => (
                                <MenuItem value={item.nombre}>{item.nombre}</MenuItem>   
                            ))
                        }    
                    </Select>
              </FormControl>
              <br />
              <label htmlFor="nombreVendedor">Nombre Vendedor</label>
              <input
                className="form-control"
                type="text"
                name="nombreVendedor"
                id="nombreVendedor"
                onChange={this.handleChange}
                value={form.nombreVendedor}
              />
              <br />
              <label htmlFor="tipoOferta">Tipo Oferta</label>
              <select
              className="form-control" 
              type="text"
              name="tipoOferta" 
              id="tipoOferta"
              onChange={this.handleChange}
              value={form.tipoOferta}
              >
                <option value="Descuento">Descuento</option>
                <option value="Promoción">Promoción</option>
              </select>
              <br />
              <label htmlFor="fecha">Fecha</label>
              <input
                className="form-control"
                type="date"
                name="fecha"
                id="fecha"
                onChange={this.handleChange}
                value={form.fecha}
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
              />
              <br />
              <label htmlFor="cantidad">Cantidad</label>
              <input
                className="form-control"
                type="number"
                name="cantidad"
                id="cantidad"
                onChange={this.handleChange}
                value={form.cantidad}
              />
              <br />
              <label htmlFor="total">Total</label>
              <input
                className="form-control"
                type="number"
                name="total"
                id="total"
                onChange={this.handleChange}
                value={form.cantidad*form.precio}
                readonly
              />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            <button 
              className="btn btn-primary" 
              onClick={() => this.putQuery()}
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
              onClick={() => this.deleteQuery()}
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
        
      </>
    );
  }
}

export default App;
