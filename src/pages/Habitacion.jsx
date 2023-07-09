import React from 'react';
import { BarMenu } from './menus/BarMenu';

export const Habitacion = (props) => {

    // funcion para llamar a BarMenu y sus respectivas opciones
  const handleFormSwitch = (formType) => {
    if (formType === 'principal') {
      props.onFormSwitch('principal');
    } else if (formType === 'administrador') {
      props.onFormSwitch('administrador');
    } else if (formType === 'habitacion') {
      props.onFormSwitch('habitacion');
    }
  };

  // Obtener datos de habitaciones desde el local storage
  const habitacionesLocalStorage = localStorage.getItem('habitaciones');
  const habitaciones = JSON.parse(habitacionesLocalStorage);

  return (
    <div className="contendores-principales">
      <header>
          {/* funcion para llamar a tabla de BarMenu y sus respectivo contenido  */}
         {/* la importamos con import { BarMenu } from './menus/BarMenu' */}
            <BarMenu onFormSwitch={handleFormSwitch} />

        <img src={process.env.PUBLIC_URL + '/logo-uleam.png'} alt="Logo" className="logo" />
      </header>

      <div className="habitaciones-contenedor">
        <h1>Habitaciones disponibles</h1>
        <div className="habitaciones-cuadricula">
          {habitaciones && habitaciones.length > 0 ? (
            habitaciones.map((habitacion, index) => (
              <section className={`room ${habitacion.tipo}`} key={index}>
                <h2>{habitacion.tipo}</h2>
                <p>Precio: {habitacion.precio} por mes</p>
                <p>Características:</p>
                <ul>
                  {habitacion.carac.split(',').map((caracteristica, idx) => (
                    <li key={idx}>{caracteristica.trim()}</li>
                  ))}
                </ul>
                <p>Cupos Disponibles: {habitacion.cupos}</p>
                <button type="submit" onClick={() => props.onFormSwitch('reservas')}>
                  Reservar
                </button>
              </section>
            ))
          ) : (
              
              <div className="no-disponible">
              <h4>No se encontraron habitaciones disponibles </h4>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Habitacion;
