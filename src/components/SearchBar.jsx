import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarritoContext from '../context/CarritoContext';
import ProductosContext from '../context/ProductosContext';

const SearchBar = () => {
  const { carrito } = useContext(CarritoContext);
  const { productos } = useContext(ProductosContext);
  const [busqueda, setBusqueda] = useState('');
  const badgeCarrito = [];
  badgeCarrito.push(carrito.reduce((acc, producto) => acc + producto.cantidad, 0));

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    );
    navigate('/busqueda', { state: { productosFiltrados } });

  };
  return (
    <div className="search-bar">
        <div className="search-bar__logo-container">
          <a href="/">
          <img htmlFor="inicio" className="search-bar__logokaluc" src="/img/kaluc.webp" alt="Ka-luc-logo"/>
          </a>
        </div>
        <form action="#" className="search-bar__form-container" onSubmit={handleSubmit}>
          <label className="search-bar__form-label">Tortas y Postres</label>
          <input 
          type="search" className="search-bar__form-search" id="busqueda"
          value={busqueda}
          onChange={handleSearch}/>
          <input 
          type="submit" className="search-bar__form-submit" value="Buscar"
          />
        </form>
        
        <div className="search-bar__carrito-container">
          <Link to="carrito">
          <img src="/img/car.svg" alt="Carrito-container"/>
        {!carrito.length <= 0 && <span className='carrito-count'>{badgeCarrito}</span>}
        </Link>
        </div>
        <div className="menu-toogle">
          <label htmlFor="menu" className="menu-toogle__label">
            <span className="menu-toogle__top-bread"></span>
            <span className="menu-toogle__meat"></span>
            <span className="menu-toogle__bottom-bread"></span>
          </label>
        </div>
      </div>
  );
};

export default SearchBar;
