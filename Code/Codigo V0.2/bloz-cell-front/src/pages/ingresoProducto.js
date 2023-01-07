/* eslint-disable react/jsx-no-comment-textnodes */
import "./App.css";
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

const url = "http://localhost:3001/api/products";

class App extends React.Component {
  //Estado del data y del form
  state = {
    data: [],
    form: {
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
    modalInsert: false,
    modalDelete: false,
    modalEdit: false,
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
        this.modalInsert();
        this.getQuery();
      });
  };

  deleteQuery = () => {
    axios.delete(url + "/" + this.state.form.idProducto).then((response) => {
      this.setState({ modalDelete: false });
      this.getQuery();
    });
  };
  componentDidMount() {
    this.getQuery();
  }
  //Controlador de cambios
  handleChange = (e) => {
    e.persist();
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
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
        nombre: element.nombre,
        marca: element.marca,
        modelo: element.modelo,
        precio: element.precio,
        caracteristicas: element.caracteristicas,
        imagen: element.imagen,
        cantidad: element.cantidad,
        categoria: element.categoria,
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
            Insertar Producto
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th>Caracteristicas</th>
                <th>Imagen</th>
                <th>Cantidad</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => (
                <tr>
                  <td>{element.idProducto}</td>
                  <td>{element.nombre}</td>
                  <td>{element.marca}</td>
                  <td>{element.modelo}</td>
                  <td>{element.precio}</td>
                  <td>{element.caracteristicas}</td>
                  <td>{element.imagen}</td>
                  <td>{element.cantidad}</td>
                  <td>{element.categoria}</td>
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
              <label htmlFor="nombre">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                id="nombre"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="marca">Marca</label>
              <input
                className="form-control"
                type="text"
                name="marca"
                id="marca"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="modelo">Modelo</label>
              <input
                className="form-control"
                type="text"
                name="modelo"
                id="modelo"
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
              />
              <br />
              <label htmlFor="caracteristicas">Caracteristicas</label>
              <input
                className="form-control"
                type="text"
                name="caracteristicas"
                id="caracteristicas"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="imagen">Imagen</label>
              <input
                className="form-control"
                type="text"
                name="imagen"
                id="imagen"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="cantidad">Cantidad</label>
              <input
                className="form-control"
                type="text"
                name="cantidad"
                id="cantidad"
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="categoria">Categoria</label>
              <input
                className="form-control"
                type="text"
                name="categoria"
                id="categoria"
                onChange={this.handleChange}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="btn btn-success"
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
              <label htmlFor="nombre">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                id="nombre"
                onChange={this.handleChange}
                value={form.nombre}
              />
              <br />
              <label htmlFor="marca">Marca</label>
              <input
                className="form-control"
                type="text"
                name="marca"
                id="marca"
                onChange={this.handleChange}
                value={form.marca}
              />
              <br />
              <label htmlFor="modelo">Modelo</label>
              <input
                className="form-control"
                type="text"
                name="modelo"
                id="modelo"
                onChange={this.handleChange}
                value={form.modelo}
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
              <label htmlFor="caracteristicas">Caracteristicas</label>
              <input
                className="form-control"
                type="text"
                name="caracteristicas"
                id="caracteristicas"
                onChange={this.handleChange}
                value={form.caracteristicas}
              />
              <br />
              <label htmlFor="imagen">Imagen</label>
              <input
                className="form-control"
                type="text"
                name="imagen"
                id="imagen"
                onChange={this.handleChange}
                value={form.imagen}
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
              />
              <br />
              <label htmlFor="categoria">Categoria</label>
              <input
                className="form-control"
                type="text"
                name="categoria"
                id="categoria"
                onChange={this.handleChange}
                value={form.categoria}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-primary" onClick={() => this.putQuery()}>
              Actualizar
            </button>

            <button
              className="btn btn-danger"
              onClick={() => this.modalEditHide()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
            Estás seguro que deseas eliminar {form && form.nombre}
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
      </>
    );
  }
}

export default App;
