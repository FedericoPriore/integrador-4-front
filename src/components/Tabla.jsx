import './Tabla.scss'
import { useContext } from "react"
import TablaFila from "./TablaFila"
import ProductosContext from "../context/ProductosContext"

const Tabla = () => {

  const { productos } = useContext(ProductosContext)
  console.log(productos)

  return (
    <table className="tabla-alta">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Detalles</th>
          <th>Envío</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>

        {
            productos && productos.map( (producto, idx) => (
            <TablaFila key={producto.id+idx} producto={producto} />
          ))
        }

      </tbody>

    </table>
  )
}

export default Tabla