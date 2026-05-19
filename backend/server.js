const express = require("express")
const cors = require("cors")
const db = require("./db")
const app = express()

app.use(cors())
app.use(express.json())

// mostrar tareas
app.get("/tareas", async (req, res) => {
    // sacar todas las tareas
    const [datos] = await db.query(
        "select * from tareas"
    )
    // mandar datos
    res.json(datos)
})

// agregar tarea
app.post("/tareas", async (req, res) => {
    const descripcion = req.body.descripcion

    // mysql
    await db.query(
        "insert into tareas(descripcion) values(?)",
        [descripcion]
    )
    // respuesta
    res.json({
        mensaje: "tarea guardada"
    })
})

// iniciar servidor
app.listen(3000, () => {
    console.log("servidor funcionando")
})