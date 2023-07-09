import React, { useState, useEffect } from "react";
import { BarMenu } from './menus/BarMenu';
import { ManagerReservas } from "./reservas/ManagerReservas";

export const Administrador = (props) => {
  const [datosGuardados, setDatosGuardados] = useState(() => {
    const habitacionesData = localStorage.getItem("habitaciones");
    const estudiantesData = localStorage.getItem('datosRegistro');

    if (habitacionesData && estudiantesData) {
      return {
        habitaciones: JSON.parse(habitacionesData),
        estudiantes: JSON.parse(estudiantesData)
      };
    } else {
      return {
        habitaciones: [
          { numero: "101", tipo: "Individual", capacidad: "1", precio: "$500/mes", cupos: "10", carac: "Cama individual, Espacio de almacenamiento, Escritorio y silla, Baño compartido" },
          { numero: "201", tipo: "Doble", capacidad: "2", precio: "$800/mes", cupos: "20", carac: "Camas individuales, Espacio de almacenamiento, Escritorio y sillas, Baño compartido" },
          { numero: "301", tipo: "Suite", capacidad: "4", precio: "$1200/mes", cupos: "30", carac: "Cama queen size, Sala de estar privada, Escritorio y silla, Baño privado" }
        ],
        estudiantes: [ ]
      };
    }
  });
  

  const { habitaciones, estudiantes } = datosGuardados;
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setTelefono] = useState("");
  const [contrasena, setPass] = useState("");

  const [habitacionAsignada, setHabitacionAsignada] = useState("");
  const [editData, setEditData] = useState(null);
  const [formularioVisible, setFormularioVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));    
  }, [habitaciones]);

  //mostrar el formulario de registro
  const mostrarFormulario = () => {
    setFormularioVisible(true);
  };
  const cerrarFormulario = () => {
    setFormularioVisible(false);
    // Restablecer los campos del formulario si es necesario
    setNombre("");
    setCorreo("");
    setTelefono("");
    setHabitacionAsignada("");
    setPass("");
    setEditData(null);
  };
  //agregar habitacion para poder mostrarse en la interfaz habitacion
  const agregarHabitacion = () => {
    const nuevaHabitacion = {
      numero: `${habitaciones.length + 1}01`,
      tipo: "Individual",
      capacidad: "1",
      precio: "$500/mes",
      cupos: "5",
      carac: "Cama basica, Sala de estar, Escritorio y silla, Baño publico"

    };

    setDatosGuardados(prevState => ({
      habitaciones: [...prevState.habitaciones, nuevaHabitacion],
      estudiantes: prevState.estudiantes
    }));
  };

  //remover habitacion para poder eliminarla en la interfaz habitacion
  const quitarHabitacion = () => {
    if (habitaciones.length > 3) {
      setDatosGuardados(prevState => ({
        habitaciones: prevState.habitaciones.slice(0, prevState.habitaciones.length - 1),
        estudiantes: prevState.estudiantes
      }));
    } else {
      alert("No se puede eliminar esta habitación.");
    }
  };

    //agregar estudiante para su respectiva cuenta y guardarlo en el localstorage
  const agregarEstudiante = (e) => {
    e.preventDefault();

    const datos = {
      nombre,
      correo,
      contrasena,
      habitacion: habitacionAsignada,
      numero
    };

    if (editData) {
      // Actualizar estudiante existente
      const updatedEstudiantes = estudiantes.map(estudiante => {
        if (estudiante.id === editData.id) {
          return {
            ...estudiante,
            ...datos
          };
        }
        return estudiante;
      });

      setDatosGuardados(prevState => ({
        habitaciones: prevState.habitaciones,
        estudiantes: updatedEstudiantes
      }));

      setEditData(null);
    } else {
      // Agregar nuevo estudiante
      const nuevoEstudiante = {
        id: Date.now(),
        ...datos
      };

      setDatosGuardados(prevState => ({
        habitaciones: prevState.habitaciones,
        estudiantes: [...prevState.estudiantes, nuevoEstudiante]
      }));
    }

    setNombre("");
    setCorreo("");
    setTelefono("");
    setPass("");
    setHabitacionAsignada("");
    cerrarFormulario();
  };
    // funcion para editar datos del estudiante mediante un CRUD

  const editarEstudiante = (estudiante) => {
    setEditData(estudiante);
    setNombre(estudiante.nombre);
    setCorreo(estudiante.correo);
    setTelefono(estudiante.numero);
    setPass(estudiante.contrasena);
    setHabitacionAsignada(estudiante.habitacion);
    mostrarFormulario();
  };
    // funcion para eliminar datos del estudiante mediante un boton

  const eliminarEstudiante = (id) => {
    const confirmacion = window.confirm(`¿Está seguro que desea eliminar el estudiante con id: ${id}?`);
    if (confirmacion) {
      const updatedEstudiantes = estudiantes.filter(estudiante => estudiante.id !== id);
      setDatosGuardados(prevState => ({
        habitaciones: prevState.habitaciones,
        estudiantes: updatedEstudiantes
      }));
    }
  };
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
  return (
       // Administrador de gestion de residencia

      <div>
        <div className="contenedor-tabla">
            {/* funcion para llamar a tabla de BarMenu y sus respectivo contenido  */}
            {/* la importamos con import { BarMenu } from './menus/BarMenu' */}
            <BarMenu onFormSwitch={handleFormSwitch} />

          <img src={process.env.PUBLIC_URL + '/logo-uleam.png'} alt="Logo" className="logo" />
          <h1>Gestión de Residencia Universitaria</h1>
  
          <main>
            <h2>Habitaciones disponibles</h2>
  
            <table className="tabla-habitaciones">
              <thead>
                <tr>
                  <th>Número de habitación</th>
                  <th>Tipo de habitación</th>
                  <th>Capacidad</th>
                  <th>Precio</th>
                  <th>Cupos</th>
                  <th>Caracteristicas</th>
                </tr>
              </thead>
              <tbody>
              {habitaciones.map((habitacion, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={habitacion.numero}
                      onChange={e => {
                        const updatedHabitaciones = [...habitaciones];
                        updatedHabitaciones[index].numero = e.target.value;
                        setDatosGuardados(prevState => ({
                          habitaciones: updatedHabitaciones,
                          estudiantes: prevState.estudiantes
                        }));                        
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={habitacion.tipo}
                      onChange={e => {
                        const updatedHabitaciones = [...habitaciones];
                        updatedHabitaciones[index].tipo = e.target.value;
                        setDatosGuardados(prevState => ({
                          habitaciones: updatedHabitaciones,
                          estudiantes: prevState.estudiantes
                        }));                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={habitacion.capacidad}
                      onChange={e => {
                        const updatedHabitaciones = [...habitaciones];
                        updatedHabitaciones[index].capacidad = e.target.value;
                        setDatosGuardados(prevState => ({
                          habitaciones: updatedHabitaciones,
                          estudiantes: prevState.estudiantes
                        }));                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={habitacion.precio}
                      onChange={e => {
                        const updatedHabitaciones = [...habitaciones];
                        updatedHabitaciones[index].precio = e.target.value;
                        setDatosGuardados(prevState => ({
                          habitaciones: updatedHabitaciones,
                          estudiantes: prevState.estudiantes
                        }));                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={habitacion.cupos}
                      onChange={e => {
                        const updatedHabitaciones = [...habitaciones];
                        updatedHabitaciones[index].cupos = e.target.value;
                        setDatosGuardados(prevState => ({
                          habitaciones: updatedHabitaciones,
                          estudiantes: prevState.estudiantes
                        }));                      }}
                    />
                  </td>
                  <td>
                    <textarea
                      value={habitacion.carac}
                      onChange={e => {
                        const updatedHabitaciones = [...habitaciones];
                        updatedHabitaciones[index].carac = e.target.value;
                        setDatosGuardados(prevState => ({
                          habitaciones: updatedHabitaciones,
                          estudiantes: prevState.estudiantes
                        }));                      }}
                    ></textarea>
                  </td>
                </tr>
              ))}
            </tbody>

            </table>
  
            <div className="botones-habitaciones">
              <button type="submit" onClick={agregarHabitacion}>
                Agregar habitación
              </button>
              <button type="submit" onClick={quitarHabitacion}>
                Quitar habitación
              </button>
            </div>
  
            <h2>Lista de Estudiantes</h2>
  
            <table className="tabla-estudiantes">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Contraseña</th>
                  <th>Habitación</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id}>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.correo}</td>
                    <td>{estudiante.numero}</td>
                    <td>{estudiante.contrasena}</td>
                    <td>{estudiante.habitacion}</td>
                    <td>
                      <button
                        type="eliminate"
                        onClick={() => editarEstudiante(estudiante)}
                      >
                        Editar
                      </button>
                      <button
                        type="eliminate"
                        onClick={() => eliminarEstudiante(estudiante.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <div className="registro-admin-boton">
              <button type="submit" onClick={() => mostrarFormulario()}>
                Agregar Estudiante
              </button>
            </div>
            {formularioVisible && (
              <form
                id="registro-estudiante"
                className="formulario"
                onSubmit={agregarEstudiante}
                style={{ display: mostrarFormulario ? "block" : "none" }}
              >
                <h2>{editData ? "Editar estudiante" : "Registrar nuevo estudiante"}</h2>
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  maxLength="10"
                  value={numero}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  required
                  maxLength="20"
                  value={contrasena}
                  onChange={(e) => setPass(e.target.value)}
                />
  
                <label htmlFor="tipo-habitacion">Habitación asignada</label>
                <select
                  id="tipo-habitacion"
                  name="habitacion"
                  required
                  value={habitacionAsignada}
                  onChange={(e) => setHabitacionAsignada(e.target.value)}
                >
                  <option value="">Seleccione una habitación</option>
                  {habitaciones.map((habitacion, index) => (
                    <option key={index} value={habitacion.numero}>
                      {habitacion.numero}
                    </option>
                  ))}
                </select>
                <button type="submit">{editData ? "Actualizar" : "Registrar"}</button>
              </form>
            )}
          </main>
        </div>
       
        <div className="contenedor-tabla">

      {/* funcion para llamar a tabla de ManagerReservas y sus respectivo contenido  */}
      {/* la importamos con import { ManagerReservas } from "./reservas/ManagerReservas" */}

          <ManagerReservas/>
        </div>
      </div>
    );
  };