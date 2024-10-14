import React, { useContext } from 'react'
import CarritoContext from '../context/CarritoContext'

const ItemCarrito = ({producto}) => {

    const { eliminarProductoDelCarritoContext } = useContext(CarritoContext)

    const handleEliminar = (id) => {
        console.log('Eliminando el producto...', id)
        eliminarProductoDelCarritoContext(id)
    }

    const subtotal = producto.cantidad * producto.precio;

  return (
    <tr>
        <td>
            <img src={producto.foto} alt={producto.nombre} width="50px" />
        </td>
        <td>{producto.nombre}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.precio}</td>
        <td>${subtotal.toFixed(2)}</td>
        <td><button className='buttonform' onClick={() => handleEliminar(producto.id)}>Eliminar</button></td>
    
    </tr>
  )
}

export default ItemCarrito