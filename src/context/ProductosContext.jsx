import { useState } from "react";
import { createContext } from "react";
import { helperPeticionesHttp } from "../helpers/helper-Peticiones-HTTP";
import { useEffect } from "react";

//  CREANDO CONTEXTO

const ProductosContext = createContext()
//  Armamos el provider
const ProductosProvider = ( { children} ) => {

    const url = import.meta.env.VITE_BACKEND_PRODUCTOS

    const [productos, setProductos] = useState(null)

    const [productoAEditar, setProductoAEditar] = useState(null)

    useEffect(() => {
        getAllProductos()
    }, [])

    const getAllProductos = async () => {

        try {

            const prods = await helperPeticionesHttp(url, {})

            setProductos(prods)
            
        } catch (error) {
            console.error('[getAllProductos]', error)
        }
    }

    const crearProductoContext = async (nuevoProducto) => {

        try {

            const options = {
                method: 'POST',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(nuevoProducto)
            }

            const newProducto = await helperPeticionesHttp(url, options)

            setProductos([...productos, newProducto])
            
        } catch (error) {
            console.error('[crearProductoContext]', error)
        }

    }

    const actualizarProductoContext = async (productoEditado) => {
      
        try {

            const options = {
                method: 'PUT',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(productoEditado)
            }

            const urlEdicion = url + productoEditado.id 

            const editedProduct = await helperPeticionesHttp(urlEdicion, options)

            const nuevoEstadoProductos = productos.map( 
                producto => producto.id === editedProduct.id ? editedProduct : producto
            )
            setProductos(nuevoEstadoProductos)
            
        } catch (error) {
            console.error('[actualizarProductoContext]', error)
        }

    }


    const data = {
        productos,
        crearProductoContext,
        actualizarProductoContext,
        productoAEditar,
        setProductoAEditar
    }

    return <ProductosContext.Provider value={data}>{ children }</ProductosContext.Provider>
}
//  3 Exportamos el contexto y provider

export { ProductosProvider }
export default ProductosContext