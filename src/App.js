import React, { useState } from "react";

import './App.css';
import { Principal} from "./pages/Principal";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register.jsx";
import { Habitacion } from "./pages/Habitacion.jsx";
import { Reservas } from "./pages/Reservas.jsx";
import { Administrador } from "./pages/Administrador.jsx";
import { BarMenu } from "./pages/menus/BarMenu.jsx";

function App() {
  // Define el estado inicial 'currentForm' y la función para actualizarlo
  const [currentForm, setCurrentForm] = useState('principal');

  // Función para cambiar el formulario actual
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  // Retorna el código JSX que representa el componente 'App'
  return (
    <div className="App">
    {currentForm === "login" ? (
      <Login onFormSwitch={toggleForm} />
    ) : currentForm === "principal" ? (
      <Principal onFormSwitch={toggleForm} />
    ) : currentForm === "register" ? (
      <Register onFormSwitch={toggleForm} />
    ) : currentForm === "habitacion" ? (
      <Habitacion onFormSwitch={toggleForm} />
    ) : currentForm === "reservas" ? (
      <Reservas onFormSwitch={toggleForm} />
    ) : currentForm === "barmenu" ? (
      <BarMenu onFormSwitch={toggleForm} />
    ) : (
      <Administrador onFormSwitch={toggleForm} />
    )}
  </div>
  );
}

export default App;
