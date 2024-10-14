import { useState } from "react";
import { createContext } from "react";
import { helperPeticionesHttp } from "../helpers/helper-peticiones-http";
import { useEffect } from "react";

const ProductosContext = createContext();
const ProductosProvider = ({ children }) => {
  const url = import.meta.env.VITE_BACKEND_PRODUCTOS
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  useEffect(() => {
    getAllProductos();
  }, []);

  const getAllProductos = async () => {
    try {
      const prods = await helperPeticionesHttp(url, {});

      setProductos(prods);
    } catch (error) {
      console.error('[getAllProductos]', error);
    }
  };

  const crearProductoContext = async (nuevoProducto) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      };

      const newProducto = await helperPeticionesHttp(url, options);

      setProductos([...productos, newProducto]);
    } catch (error) {
      console.error('[crearProductoContext]', error);
    }
  };

  const actualizarProductoContext = async (productoEditado) => {
    try {
      const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(productoEditado),
      };

      const urlEdicion = url + productoEditado.id;
      const editedProduct = await helperPeticionesHttp(urlEdicion, options);
      const nuevoEstadoProductos = productos.map((producto) =>
        producto.id === editedProduct.id ? editedProduct : producto,
      );

      setProductos(nuevoEstadoProductos);
    } catch (error) {
      console.error('[actualizarProductoContext]', error);
    }
  };

  const eliminarProductoContext = async (id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      };
      const urlEliminacion = url + id;
      await helperPeticionesHttp(urlEliminacion, options);
      const nuevoEstadoProductos = productos.filter((productoAEliminar) => productoAEliminar.id !== id);
      setProductos(nuevoEstadoProductos);
      setProductoAEliminar(null);
    } catch (error) {
      console.error('[eliminarProductoContext]', error);
    }
  };

  const data = {
    productos,
    crearProductoContext,
    actualizarProductoContext,
    productoAEditar,
    productoAEliminar,
    setProductoAEditar,
    eliminarProductoContext,
    setProductoAEliminar,
    setProductos,
  };

  return <ProductosContext.Provider value={data}>{children}</ProductosContext.Provider>;
};

export { ProductosProvider };
export default ProductosContext;
