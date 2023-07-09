import React, { useState, useEffect } from 'react';

export const ManagerReservas = (props) => {
  const [reservas, setReservas] = useState([]);

    // generador de numeros para el id

  const getNewId = () => {
    const contador = localStorage.getItem('reservanumeros') || '0';
    const newId = parseInt(contador) + 1;
    localStorage.setItem('reservanumeros', newId.toString());
    return newId.toString();
  };

  useEffect(() => {
    // Obtener datos guardados desde el local storage al cargar el componente
    const reservasData = localStorage.getItem('reservaData');
    const reservasGuardadas = JSON.parse(reservasData);

    if (reservasGuardadas) {
      setReservas(reservasGuardadas);
    } else {
      // Agregar una reserva por defecto si no hay datos guardados
      const nuevaReserva = {
        id: getNewId(),
        tipoHabitacion: 'individual',
        fechaEntrada: '24/07/2023',
        fechaSalida: '25/07/2023',
        nombre: 'Juan',
        correo: 'juan@gmail.com',
        telefono: '0979550132',
        metodoPago: 'paypal',
        numeroTarjeta: '',
        nombreTarjeta: '',
        fechaVencimiento: '',
        codigoSeguridad: '',
        banco: '',
        cuenta: '',
        correoPaypal: '',
        reservarid: false
      };

      setReservas([nuevaReserva]);
      localStorage.setItem('reservaData', JSON.stringify([nuevaReserva]));
    }
  }, []);

  const aceptarResidencia = (index) => {

    alert(`Reserva ${index + 1} aceptada`);

    // Actualizar el estado de la reserva
    const nuevasReservas = [...reservas];
    nuevasReservas[index].reservarid = true;
    setReservas(nuevasReservas);

    // Guardar los cambios en el almacenamiento local
    localStorage.setItem('reservaData', JSON.stringify(nuevasReservas));
  };

  const denegarResidencia = (index) => {
    alert(`Reserva ${index + 1} denegada`);
  
    // Eliminar la reserva de la tabla
    const nuevasReservas = [...reservas];
    nuevasReservas.splice(index, 1);
    setReservas(nuevasReservas);
  
    // Guardar los cambios en el almacenamiento local
    localStorage.setItem('reservaData', JSON.stringify(nuevasReservas));
  };

  return (
        // tabla de solicitud de residencias para la interfaz del administrador

    <div className="habitaciones-contenedor">
      <h1>Solicitud de Residencias</h1>
      <table className="tabla-habitaciones">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Habitación</th>
            <th>Fecha de Entrada</th>
            <th>Fecha de Salida</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Método de Pago</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas && reservas.length > 0 ? (
            reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.id}</td>
                <td>{reserva.tipoHabitacion}</td>
                <td>{reserva.fechaEntrada}</td>
                <td>{reserva.fechaSalida}</td>
                <td>{reserva.nombre}</td>
                <td>{reserva.correo}</td>
                <td>{reserva.telefono}</td>
                <td>{reserva.metodoPago}</td>
                <td>
                  <button type="eliminate" onClick={() => aceptarResidencia(index)}>Aceptar</button>
                  <button type="eliminate" onClick={() => denegarResidencia(index)}>Denegar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No se encontraron reservas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerReservas;
