import './ListadoCarrito.scss'
import { useContext } from 'react'
import ItemCarrito from './ItemCarrito'
import CarritoContext from '../context/CarritoContext'
import './ListadoCarrito.scss'

const ListadoCarrito = () => {

  const { carrito, limpiarCarritoContext, guardarCarritoContext } = useContext(CarritoContext)

  const handleComprar = () => {
    alert('Gracias por su compra');
    guardarCarritoContext(carrito);
    limpiarCarritoContext();
  };

  const handleLimpiarCarrito = () => {
    console.log('Vaciando carrito...')
    limpiarCarritoContext()
  }

  const totalEnCarrito = [];
  totalEnCarrito.push(carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0));

  const totalFinal = totalEnCarrito[0];


  return (
    <>
        <table className='tabla-carrito'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    carrito.length <= 0 ? (
                        <tr>
                            <td colSpan={6} style={{textAlign: 'center'}}>No hay productos</td>
                        </tr>
                    ) : (
                        carrito.map((producto, idx) => (
                            <ItemCarrito key={idx} producto={producto} />
                        ))
                    )
                }
            </tbody>
        </table>
        <hr />
        { !carrito.length <= 0 && (
                <>
          <div colSpan='6' className='totalEnCarrito'>
            <p>
              <b>Total: </b>
              {`$${totalFinal.toFixed(2)}`}
            </p>
          </div>
          <div className="contenedorBotonesCarrito">
            <button className='buttonformcarrito' onClick={handleLimpiarCarrito}>Vaciar Carrito</button>
            <button className='buttonformcarrito' onClick={handleComprar}>Comprar</button>
          </div>
          </>
            )
        }
    </>
  )
}

export default ListadoCarrito