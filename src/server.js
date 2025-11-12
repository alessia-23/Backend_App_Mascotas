import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ownerRoutes from './routes/owner_routes.js'
import avatarRoutes from './routes/avatar_routes.js'
import docgFactRoutes from './routes/dog_fact_routes.js'


// Inicializaciones
const app = express()
dotenv.config()

// Middlewares
app.use(express.json())
app.use(cors())

// Variables globales
app.set('port', process.env.PORT || 3000)

// Rutas
app.get('/', (req, res) => res.send("Server on"))
app.use("/api", ownerRoutes)
app.use("/api", avatarRoutes)
app.use("/api", docgFactRoutes)

export default app
