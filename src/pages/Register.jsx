import React, { useState } from 'react';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [numero, setNumero] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass || !name || !confirmPass || !numero) {
      // Si alguno de los campos está vacío, muestra una alerta
      alert('Por favor, completa todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      // El campo de correo electrónico no tiene un formato válido
      alert('Por favor, ingresa un correo electrónico válido');
      return;
    }

    if (pass !== confirmPass) {
      // Las contraseñas no coinciden, muestra una alerta
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!validateNumber(numero)) {
      // El campo de número no tiene un formato válido
      alert('Por favor, ingresa un número válido');
      return;
    }
        // Verificar si el usuario ya existe en localStorage
        const datosRegistro = localStorage.getItem('datosRegistro');

        if (datosRegistro) {
          const datos = JSON.parse(datosRegistro);
          const usuarioExistente = datos.find((estudiante) => estudiante.correo === email);

          if (usuarioExistente) {
            alert('El usuario o correo ya está registrado. Utiliza otro');
            return;
          }
        }
    // Las contraseñas coinciden y los campos están completos, realiza el registro
    const nuevoEstudiante = {
      id: getNewId(),
      nombre: name,
      correo: email,
      contrasena: pass,
      habitacion: 'No',
      numero
    };

    try {
      // Guardar los datos en localStorage
      const datosGuardados = localStorage.getItem('datosRegistro');
      let datos = [];
      if (datosGuardados) {
        datos = JSON.parse(datosGuardados);
      }
      datos.push(nuevoEstudiante);
      localStorage.setItem('datosRegistro', JSON.stringify(datos));

      console.log('Datos de registro guardados en localStorage');
      alert('Registrado correctamente');
      setEmail('');
      setPass('');
      setName('');
      setConfirmPass('');
      setNumero('');
    } catch (error) {
      console.error('Error al guardar los datos de registro en localStorage:', error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNumber = (number) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(number);
  };
  //creacion de numero para evitar problemas con el localstorage
  const getNewId = () => {
    const contador = localStorage.getItem('contador') || '0';
    const newId = parseInt(contador) + 1;
    localStorage.setItem('contador', newId.toString());
    return newId.toString();
  };


  return (
           // formulario de registro

    <div className="contendores-principales">
      <header>
        <img src={process.env.PUBLIC_URL + '/logo-uleam.png'} alt="Logo" className="logo" />
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>REGISTRO</h2>
        <div className="separador">
          <label htmlFor="name">Nombre de usuario:</label>
          <input value={name} type="text" name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nombres" required />
        </div>
        <div className="separador">
          <label htmlFor="email">Correo electrónico:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@gmail.com" id="email" name="email" required />
        </div>
        <div className="separador">
          <label htmlFor="numero">Número:</label>
          <input value={numero} onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))} type="text" placeholder="Número de teléfono" id="numero" name="numero" required />
        </div>

        <div className="separador">
          <label htmlFor="password">Contraseña:</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
        </div>
        <div className="separador">
          <label htmlFor="confirm-password">Confirmar contraseña:</label>
          <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirm-password" name="confirm-password" required />
        </div>
       
        <span className="link-text">¿Ya tienes una cuenta?{' '}
          <span className="link-clic" onClick={() => props.onFormSwitch('login')}>Inicia sesión aquí</span>
          .
        </span>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
