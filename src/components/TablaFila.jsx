import { useContext } from 'react';
import ProductosContext from '../context/ProductosContext';
import './TablaFila.scss'

const TablaFila = ({ producto }) => {
  if (!producto || !producto.id) {
    console.error("Producto inválido:", producto);
    return null; 
  }

  const { setProductoAEditar } = useContext(ProductosContext);
  const handleEditar = (producto) => {
    setProductoAEditar(producto);
  };

  const { eliminarProductoContext, setProductoAEliminar } = useContext(ProductosContext);
  const handleEliminar = () => () => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${producto.nombre}?`)) {
      eliminarProductoContext(producto.id);
    } else {
      setProductoAEliminar(null);
    }
  };

  return (
    <tr>
      <td>
        <img className="img-row" src={producto.foto} alt={producto.nombre} />
        </td>
      <td>{producto.nombre}</td>
      <td>{producto.precio}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
      <td>{producto.detalles}</td>
        <td>{producto.envio ? 'SI' : 'NO'}</td>
        <td>  
        <button className='buttonform' onClick={() => handleEditar(producto)}>
          Editar
        </button>
        <button className='buttonform' onClick={handleEliminar(producto)}>
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default TablaFila;
