const AdminModels = require('../../models/mongodb/admin')
const validator = require('email-validator')
const { phone } = require('phone')
const { ShowErrUnique } = require('../../helper/showErr/showErr')
const { ValidatePagination } = require('../../helper/pagination/pagination')

exports.Admin = async (req, res) => {
    
    const { page, limit } = ValidatePagination(req.query)
    console.log(page, limit)
    const listAdmin = await AdminModels.find({}).skip(page).limit(limit)
    const totalAdmin =  await AdminModels.count({}, (err, count)=> (count))
    console.log(totalAdmin)
    return res.status(200).json({ data: listAdmin })
}

exports.AddAdmin = (req, res) => {
    const { email, phoneNumber } = req.body
    
    const isValidEmail = validator.validate(email)
    const isPhoneNumber = phone(phoneNumber);

    if (!isValidEmail){
        return res.status(400).json({ msg: 'invalid email' })
    }

    if (!isPhoneNumber.isValid){
        return res.status(400).json({ msg: 'invalid phone' })
    }
    
    const newAdmin = new AdminModels(req.body)

    newAdmin.save()
        .then(success => {
            return res.status(200).json({ msg: 'success add admin' })
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(400).json({ msg: ShowErrUnique(err) })
            }
            res.status(500).json({ msg: 'error' })
        })


}