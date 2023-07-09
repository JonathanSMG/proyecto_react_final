import React, { useState, useEffect } from 'react';
import { BarMenu } from './menus/BarMenu';

const currentYear = new Date().getUTCFullYear();

export const Reservas = (props) => {
  const [tipoHabitacion, setTipoHabitacion] = useState('individual');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [banco, setBanco] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [correoPaypal, setCorreoPaypal] = useState('');
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Recuperar los datos guardados del localStorage al cargar el componente
    const reservasData = localStorage.getItem('reservaData');
    if (reservasData) {
      try {
        const reservasParsed = JSON.parse(reservasData);
        if (Array.isArray(reservasParsed)) {
          setReservas(reservasParsed);
        } else {
          setReservas([]);
          console.log('Los datos de reserva guardados no son un array válido');
        }
      } catch (error) {
        setReservas([]);
        console.log('Error al analizar los datos de reserva guardados');
      }
    } else {
      setReservas([]);
    }
  }, []);
    // funcion para llamar a BarMenu y sus respectivas opciones

  const handleFormSwitch = (formType) => {
    if (formType === 'principal') {
      props.onFormSwitch('habitacion');
    } else if (formType === 'administrador') {
      props.onFormSwitch('administrador');
    } else if (formType === 'habitacion') {
      props.onFormSwitch('habitacion');
    }
  };
    // evento del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    //  validación de fechas y campos de pago
    if (!fechaEntrada || !fechaSalida || !nombre || !correo || !telefono || !metodoPago) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    const fechaEntradaObj = new Date(fechaEntrada);
    const fechaSalidaObj = new Date(fechaSalida);
    
    if (isNaN(fechaEntradaObj.getTime()) || isNaN(fechaSalidaObj.getTime())) {
      alert('Fecha de entrada o salida no válida');
      return;
    }
    
    if (fechaSalidaObj <= fechaEntradaObj) {
      alert('La fecha de salida debe ser posterior a la fecha de entrada');
      return;
    }
    
    // Validar el teléfono utilizando una expresión regular
    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefono.match(telefonoRegex)) {
      alert('El número de teléfono no es válido');
      return;
    }
    
    // Validar el correo electrónico utilizando una expresión regular
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.match(correoRegex)) {
      alert('El correo electrónico no es válido');
      return;
    }

    //datos
    const reservaData = {
      id: getNewId(),
      tipoHabitacion,
      fechaEntrada,
      fechaSalida,
      nombre,
      correo,
      telefono,
      metodoPago,
      numeroTarjeta,
      nombreTarjeta,
      fechaVencimiento,
      codigoSeguridad,
      banco,
      cuenta,
      correoPaypal,
      reservarid: false
    };

    const nuevasReservas = [...reservas, reservaData];
    setReservas(nuevasReservas);

    //guardar datos en el localtorage
    const reservasDataJSON = JSON.stringify(nuevasReservas);
    localStorage.setItem('reservaData', reservasDataJSON);

    // Limpiar los campos del formulario después de enviar la reserva
    setTipoHabitacion('individual');
    setFechaEntrada('');
    setFechaSalida('');
    setNombre('');
    setCorreo('');
    setTelefono('');
    setMetodoPago('');
    setNumeroTarjeta('');
    setNombreTarjeta('');
    setFechaVencimiento('');
    setCodigoSeguridad('');
    setBanco('');
    setCuenta('');
    setCorreoPaypal('');
  };

  //funcion de metodo de pago
  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

  //creacion de numero para evitar problemas con el localstorage
  const getNewId = () => {
    const contador = localStorage.getItem('reservanumeros') || '0';
    const newId = parseInt(contador) + 1;
    localStorage.setItem('reservanumeros', newId.toString());
    return newId.toString();
  };

  return (
      <div className="reservas-contenedor">
        <header>
         {/* funcion para llamar a tabla de BarMenu y sus respectivo contenido  */}
         {/* la importamos con import { BarMenu } from './menus/BarMenu' */}
         <BarMenu onFormSwitch={handleFormSwitch} />

        <img src={process.env.PUBLIC_URL + '/logo-uleam.png'} alt="Logo" className="logo" />
      </header>
        <h1>Reserva tu habitación</h1>

        <form onSubmit={handleSubmit}>
          <div className="formulario-reservar">
            <label htmlFor="tipo-habitacion">Tipo de habitación:</label>
            <select id="tipo-habitacion" name="tipo-habitacion" value={tipoHabitacion} onChange={(e) => setTipoHabitacion(e.target.value)}>
              <option value="individual">Individual</option>
              <option value="doble">Doble</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div className="formulario-reservar">
            <label htmlFor="fecha-entrada">Fecha de entrada:</label>
            <input type="date" id="fecha-entrada" name="fecha-entrada"  value={fechaEntrada} onChange={(e) => setFechaEntrada(e.target.value)} max={`${currentYear}-12-31`} />
          </div>
          <div className="formulario-reservar">
            <label htmlFor="fecha-salida">Fecha de salida:</label>
            <input type="date" id="fecha-salida" name="fecha-salida"  value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} max={`${currentYear}-12-31`} />
          </div>
          <div className="formulario-reservar">
            <label htmlFor="nombre">Nombre completo:</label>
            <input type="text" id="nombre" name="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="formulario-reservar">
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="formulario-reservar">
            <label htmlFor="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" required pattern="[0-9]+" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
  
          <div className="formulario-reservar">
              <label htmlFor="metodo-pago">Método de pago:</label>
              <select id="metodo-pago" name="metodo-pago" required value={metodoPago} onChange={handleMetodoPagoChange}>
                <option value="">Seleccione un método de pago</option>
                <option value="tarjeta">Tarjeta de crédito/débito</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div id="tarjeta" className={metodoPago === "tarjeta" ? "formulario-reservar" : "formulario-reservar hidden"}>
              <label htmlFor="numero-tarjeta">Número de tarjeta:</label>
              <input type="text" id="numero-tarjeta" name="numero-tarjeta" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
              <label htmlFor="nombre-tarjeta">Nombre en la tarjeta:</label>
              <input type="text" id="nombre-tarjeta" name="nombre-tarjeta" value={nombreTarjeta} onChange={(e) => setNombreTarjeta(e.target.value)} />
              <label htmlFor="fecha-vencimiento">Fecha de vencimiento:</label>
              <input type="month" id="fecha-vencimiento" name="fecha-vencimiento" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
              <label htmlFor="codigo-seguridad">Código de seguridad:</label>
              <input type="text" id="codigo-seguridad" name="codigo-seguridad" value={codigoSeguridad} onChange={(e) => setCodigoSeguridad(e.target.value)} />
            </div>

            <div id="transferencia" className={metodoPago === "transferencia" ? "formulario-reservar" : "formulario-reservar hidden"}>
              <label htmlFor="banco">Banco emisor:</label>
              <input type="text" id="banco" name="banco" value={banco} onChange={(e) => setBanco(e.target.value)} />
              <label htmlFor="cuenta">Número de cuenta:</label>
              <input type="text" id="cuenta" name="cuenta" value={cuenta} onChange={(e) => setCuenta(e.target.value)} />
            </div>

            <div id="paypal" className={metodoPago === "paypal" ? "formulario-reservar" : "formulario-reservar hidden"}>
              <label htmlFor="correo-paypal">Correo electrónico asociado a la cuenta de PayPal:</label>
              <input type="email" id="correo-paypal" name="correo-paypal" value={correoPaypal} onChange={(e) => setCorreoPaypal(e.target.value)} />
            </div>

            <button type="submit">Enviar reserva</button>
            </form>
          </div>
   );
};
export default Reservas;
    