import { useState } from 'react'
import { useEffect } from "react"
import './App.css'

function App() {

  // guardar lo q escribe el usuario
  const [texto, setTexto] = useState("")
  const [lista, setLista] = useState([]) // lista de tareas

  // sacar tareas del backend
  async function obtenerTareas() {
    // fetch para traer datos
    const res = await fetch(
      "http://localhost:3000/tareas"
    )
    // convertir a json xq si no no sale xd
    const datos = await res.json()
    setLista(datos)
  }


  // agregar tarea
  async function agregar() {

    // validar vacio nomas
    if (texto == "") {
      alert("escribe algo")
      return
    }

    // mandar al backend
    await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        descripcion: texto
      })
    })
    setTexto("")  // limpiar
    obtenerTareas()
  }


  // apenas entra carga las tareas
  useEffect(() => {
    obtenerTareas()
  }, [])


  return (
    <div>
      <h1>todo list</h1>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={agregar}>
        agregar
      </button>
      <ul>
        {lista.map((tarea) => (
          <li key={tarea.id}>
            {tarea.descripcion}
          </li>

        ))}

      </ul>

    </div>
  )
}

export default App