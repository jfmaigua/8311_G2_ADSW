let listaProductos = [];

const objProducto = {
    id: '',
    nombreProducto: '',
    nombreVendedor: '',
    fecha: '',
    precio: '',
    cantidad: '',
    total:''
}

let editando = false;

let contador = 1;

const formulario = document.querySelector('#formulario');
const nombreProductoInput = document.querySelector('#nombreProducto');
const nombreVendedorInput = document.querySelector('#nombreVendedor');

const fechaInput = document.querySelector('#fecha');
const precioInput = document.querySelector('#precio');
const cantidadInput = document.querySelector('#cantidad');

const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreProductoInput.value === '' || nombreVendedorInput.value === '' || fechaInput.value === '' || precioInput.value === '' || cantidadInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarProducto();
        editando = false;
    } else {
        objProducto.id = contador++;
        objProducto.nombreProducto = nombreProductoInput.value;
        objProducto.nombreVendedor = nombreVendedorInput.value;

        objProducto.fecha = fechaInput.value;
        objProducto.precio = precioInput.value;
        objProducto.cantidad = cantidadInput.value;
        objProducto.total = precioInput.value * cantidadInput.value;

        agregarProducto();
    }
}

function agregarProducto() {

    listaProductos.push({...objProducto});


    mostrarProductos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objProducto.id = '';
    objProducto.nombreProducto = '';
    objProducto.nombreVendedor = '';

    objProducto.fecha = '';
    objProducto.precio = '';
    objProducto.cantidad = '';
}

function mostrarProductos() {
    limpiarHTML();

    const divProductos = document.querySelector('.div-Productos');
    
    listaProductos.forEach(Producto => {
        const {id, nombreProducto, nombreVendedor, fecha, precio, cantidad, total} = Producto;
        
        const subtitulo = document.createElement('h3');
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} | ${nombreProducto} | ${nombreVendedor} | ${fecha} | ${precio} | ${cantidad} | ${total}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(Producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

function cargarProducto(Producto) {
    const {id, nombreProducto, nombreVendedor,fecha,precio,cantidad} = Producto;

    nombreProductoInput.value = nombreProducto;
    nombreVendedorInput.value = nombreVendedor;

    fechaInput.value = fecha;
    precioInput.value = precio;
    cantidadInput.value = cantidad;

    objProducto.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarProducto() {

    objProducto.nombreProducto = nombreProductoInput.value;
    objProducto.nombreVendedor = nombreVendedorInput.value;

    objProducto.fecha = fechaInput.value;
    objProducto.precio = precioInput.value;
    objProducto.cantidad = cantidadInput.value;
    objProducto.total = precioInput.value * cantidadInput.value;

    listaProductos.map(Producto => {

        if(Producto.id === objProducto.id) {
            Producto.id = objProducto.id;
            Producto.nombreProducto = objProducto.nombreProducto;
            Producto.nombreVendedor = objProducto.nombreVendedor;

            Producto.fecha = objProducto.fecha;
            Producto.precio = objProducto.precio;
            Producto.cantidad = objProducto.cantidad;
            Producto.total = objProducto.precio * objProducto.cantidad;
        }

    });

    limpiarHTML();
    mostrarProductos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarProducto(id) {

    listaProductos = listaProductos.filter(Producto => Producto.id !== id);

    limpiarHTML();
    mostrarProductos();
}

function limpiarHTML() {
    const divProductos = document.querySelector('.div-Productos');
    while(divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}