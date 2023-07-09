import React, { useState } from 'react';

  // Menu interactivo


export const BarMenu = (props) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Abrir Administrador

  const abrirModal = () => {
    setMostrarModal(true);
  };
  // cerrar Administrador

  const cerrarModal = () => {
    setMostrarModal(false);
    setNombreUsuario('');
    setContraseña('');
  };
  // Ejecutar eventos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombreUsuario === 'Administrador' && contraseña === '12345') {
      // Realizar las acciones de administración aquí
      alert('Acciones de administración realizadas.');
      cerrarModal();
      props.onFormSwitch('administrador'); // Llamada a onFormSwitch en props
    } else {
      alert('El nombre de usuario o la contraseña son incorrectos.');
    }
    setNombreUsuario('');
    setContraseña('');
  };

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };


  return (
    // Codigo html con sus respectivos contenedor

    <div id="barmenu-container" className={`barmenu ${mostrarMenu ? 'active' : ''}`} onClick={toggleMenu}>
      <div className="menu-icon">
        <div className={`line ${mostrarMenu ? 'active' : ''}`} />
        <div className={`line ${mostrarMenu ? 'active' : ''}`} />
        <div className={`line ${mostrarMenu ? 'active' : ''}`} />
      </div>
      {mostrarMenu && (
            // opciones de menu BarMenu conocido como hambumgersa

        <div className="menu-options" onClick={handleClick}>
    
          <span className="link-clic" onClick={abrirModal}>
            Entrar como Administrador
          </span>

          <span className="link-clic" onClick={() => props.onFormSwitch('principal')}>
            Salir
          </span>
        </div>
      )}
      {mostrarModal && (
          // contenido del menu del adminstrador

        <div className="administrador">
          <div className="administrador-contenido">
            <button className="administrador-cerrar" onClick={cerrarModal}>Cerrar</button>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre-usuario">Nombre del Administrador:</label>
              <input type="text" id="nombre-admin" name="nombre-usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
              <br />
              <label htmlFor="contrasena">Contraseña del administrador:</label>
              <input type="password" id="contrasena-admin" name="contrasena" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
              <br />
              <button type="submit">Iniciar sesión</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
