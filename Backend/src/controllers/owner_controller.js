import Owner from "../models/Owner.js"
import { sendMailToRegister, sendMailToRecoveryPassword } from "../helpers/sendMail.js"

const registro = async (req, res) => {
    try {
        // PASO 1: Obtener los datos
        const { email, password } = req.body

        // PASO 2: Validar campos vacíos
        if (Object.values(req.body).includes(""))
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

        // Verificar si el correo ya existe
        const verificarEmailBDD = await Owner.findOne({ email })
        if (verificarEmailBDD)
            return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })

        // PASO 3: Crear nueva instancia
        const newOwner = new Owner(req.body)
        newOwner.password = await newOwner.encryptPassword(password) // Encriptar password
        const token = newOwner.createToken() // Crear token

        // Enviar correo de confirmación
        await sendMailToRegister(email, token)

        await newOwner.save()
        res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" })

    } catch (error) {
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

const confirmarMail = async (req, res) => {
    try {
        const { token } = req.params
        console.log("🔹 Token recibido:", token)

        const ownerBDD = await Owner.findOne({ token })
        console.log("🧩 Usuario encontrado:", ownerBDD)

        if (!ownerBDD) {
            return res.status(404).json({ msg: "Token inválido o cuenta ya confirmada" })
        }

        ownerBDD.token = null
        ownerBDD.confirmEmail = true
        ownerBDD.status = true
        await ownerBDD.save()

        res.status(200).json({ msg: "Cuenta confirmada, ya puedes iniciar sesión" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}


// ✅ RECUPERAR PASSWORD
const recuperarPassword = async (req, res) => {
    try {
        // PASO 1: Obtener el email
        const { email } = req.body
        if (!email)
            return res.status(400).json({ msg: "Debes ingresar un correo electrónico" })

        // PASO 2: Buscar usuario por email
        const ownerBDD = await Owner.findOne({ email })
        if (!ownerBDD)
            return res.status(404).json({ msg: "El usuario no se encuentra registrado" })

        // PASO 3: Crear token y enviar mail
        const token = ownerBDD.createToken()
        ownerBDD.token = token
        await sendMailToRecoveryPassword(email, token)
        await ownerBDD.save()

        res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu cuenta" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

// ✅ COMPROBAR TOKEN DE PASSWORD
const comprobarTokenPassword = async (req, res) => {
    try {
        const { token } = req.params
        const ownerBDD = await Owner.findOne({ token })
        if (ownerBDD?.token !== token) {
            return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
        }

        res.status(200).json({ msg: "Token confirmado, ya puedes crear tu nuevo password" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

// ✅ CREAR NUEVO PASSWORD
const crearNuevoPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body
        const { token } = req.params

        if (Object.values(req.body).includes("")) {
            return res.status(404).json({ msg: "Debes llenar todos los campos" })
        }
        if (password !== confirmPassword) {
            return res.status(404).json({ msg: "Los passwords no coinciden" })
        }

        const ownerBDD = await Owner.findOne({ token })
        if (!ownerBDD) {
            return res.status(404).json({ msg: "No se puede validar la cuenta" })
        }

        // Encriptar nuevo password
        ownerBDD.token = null
        ownerBDD.password = await ownerBDD.encryptPassword(password)
        await ownerBDD.save()

        res.status(200).json({ msg: "Felicitaciones, ya puedes iniciar sesión con tu nuevo password" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

// ✅ EXPORTACIONES
export {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPassword,
    crearNuevoPassword
}
