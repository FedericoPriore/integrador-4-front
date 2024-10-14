import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { helperPeticionesHttp } from "../helpers/helper-peticiones-http";

const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const [agregarAlCarrito, eliminarDelCarrito, limpiarCarrito, carrito] = useLocalStorage('carrito', []);

  function elProductoEstaEnElCarrito(producto) {
    const nuevoArray = carrito.filter((prod) => prod.id === producto.id);
    return nuevoArray.length;
  }

  function obtenerProductoDeCarrito(producto) {
    return carrito.find((prod) => prod.id === producto.id);
  }

  const agregarProductoAlCarritoContext = (producto) => {
    if (!elProductoEstaEnElCarrito(producto)) {
      producto.cantidad = 1;
      agregarAlCarrito(producto);
    } else {
      const productoDeCarrito = obtenerProductoDeCarrito(producto);
      productoDeCarrito.cantidad++;
      window.localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  };

  const eliminarProductoDelCarritoContext = (id) => {
    eliminarDelCarrito(id);
  };

  const limpiarCarritoContext = () => {
    limpiarCarrito();
  };

  const guardarCarritoContext = async (carrito) => {
    const url = {};

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({carrito}),
    };
    try {
      const compraCarrito = await helperPeticionesHttp(url, options);
    } catch (error) {
      console.error('Error saving cart:', error);
      res.status(500).json({ mensaje: 'No se pudo guardar el carrito' });
    }
  };

  const data = {
    carrito,
    agregarProductoAlCarritoContext,
    eliminarProductoDelCarritoContext,
    guardarCarritoContext,
    limpiarCarritoContext,
  };

  return <CarritoContext.Provider value={data}>{children}</CarritoContext.Provider>;
};
export { CarritoProvider };
export default CarritoContext;
