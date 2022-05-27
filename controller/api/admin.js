const AdminModels = require('../../models/mongodb/admin')
const validator = require('email-validator')
const { phone } = require('phone')

exports.Admin = async (req, res) => {
    const listAdmin = await AdminModels.find({})

    res.status(200).json({ data: listAdmin })
}

exports.AddAdmin = (req, res) => {
    const { name, email, phoneNumber, role } = req.body
    
    const isValidEmail = validator.validate(email)
    const isPhoneNumber = phone(phoneNumber);

    if (!isValidEmail){
        return res.status(400).json({ msg: 'invalid email' })
    }

    if (!isPhoneNumber.isValid){
        return res.status(400).json({ msg: 'invalid phone' })
    }
    
    const newAdmin = new AdminModels(req.body)

    newAdmin.save((err, res) => {
        if (err) throw new err

        res.send({ msg: 'success add admin' })
    })

}