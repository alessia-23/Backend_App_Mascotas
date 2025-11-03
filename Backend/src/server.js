import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ownerRoutes from './routes/owner_routes.js' // ✅ con .js

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

export default app
