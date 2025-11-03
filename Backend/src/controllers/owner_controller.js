
import Owner from "../models/Owner.js"

const registro = async (req,res)=>{

    try {
        const {email,password} = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
        const verificarEmailBDD = await Owner.findOne({email})
        if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
        const newOwner = new Owner(req.body)
        newOwner.password = await newOwner.encryptPassword(password)
        const token = newOwner.createToken()
        // Falta configurar el mail
        //await sendMailToRegister(email,token)
        await newOwner.save()
        res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})

    } catch (error) {
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }

}


export {
    registro
}