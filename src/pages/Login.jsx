import React, { useState } from 'react';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass) {
      // Si alguno de los campos está vacío, muestra una alerta
      alert('Por favor, completa todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      // El campo de correo electrónico no tiene un formato válido
      alert('Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Verificar si el correo existe en localStorage
    const datosRegistro = localStorage.getItem('datosRegistro');

    if (datosRegistro) {
      const datos = JSON.parse(datosRegistro);
      const usuarioExistente = datos.find((estudiante) => estudiante.correo === email);

      if (usuarioExistente) {
        if (usuarioExistente.contrasena === pass) {
          console.log('Inicio de sesión exitoso');
          props.onFormSwitch('habitacion');
          return;
        } else {
          alert('La contraseña es incorrecta');
          return;
        }
      }
    }

    alert('El correo electrónico no está registrado');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
       // formulario de login

    <div className="contendores-principales">
      <header>
        <img src={process.env.PUBLIC_URL + '/logo-uleam.png'} alt="Logo" className="logo" />
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <div className="separador">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="tucorreo@gmail.com"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="separador">
          <label htmlFor="password">Contraseña</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
        </div>

        <span className="link-text">
          ¿No tienes una cuenta?{' '}
          <span className="link-clic" onClick={() => props.onFormSwitch('register')}>
            Regístrate aquí
          </span>
          .
        </span>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};
