import React from 'react';

export const Principal = (props) => {

  return (
    <div className="contendores-principales">
      <header>
        <img src={process.env.PUBLIC_URL + '/logo-uleam.png'} alt="Logo" className="logo" />
      </header>

      <strong className="titulo">GESTIÓN DE RESIDENCIA UNIVERSITARIA</strong>

      <div className="indice">
      <nav>
          {/* Botones */}
          <button type="submit" onClick={() => props.onFormSwitch('register')}>Registrarse</button>

          <span> | </span>

          <button type="submit" onClick={() => props.onFormSwitch('login')}>Iniciar sesión</button>

        </nav>
      </div>

      <div className="gestion">
            <h2>OBJETIVO</h2>
            <p>La gestión de la residencia universitaria tiene como objetivo proporcionar un ambiente seguro, cómodo y propicio para el estudio y desarrollo personal de los estudiantes.</p>
          
          <h2>Actividades de Gestión</h2>
          <ol>
            <li>Administración de la asignación de habitaciones</li>
            <li>Brindar apoyo y orientación a los residentes</li>
          </ol>
          
          <h2>Beneficios</h2>
          <ul>
            <li>Entorno favorable para el crecimiento académico y personal</li>
            <li>Fomento de la convivencia y el respeto mutuo</li>
            <li>Acceso a servicios de apoyo académico</li>
            <li>Experiencia universitaria enriquecedora</li>
        </ul>
      </div>

    </div>
  );
};

export default Principal;
