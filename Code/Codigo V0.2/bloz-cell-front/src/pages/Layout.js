import { Outlet, Link } from 'react-router-dom';

const Layout = () =>{
    return <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/productos">Ingreso de Productos</Link>
                </li>
                <li>
                    <Link to="/productoSalida">Salida de Productos</Link>
                </li>
            </ul>
        </nav>
        <hr/>
        <Outlet />
    </div>
}
export default Layout;