const AdminModels = require('../../models/mongodb/admin')
const validator = require('email-validator')
const { phone } = require('phone')
const { ShowErrUnique } = require('../../helper/showErr/showErr')
const { ValidatePagination } = require('../../helper/pagination/pagination')

exports.Admin = async (req, res) => {
    const { name, email } = req.query
    const queryEx = { name: {'$regex': name}, email: { '$regex': email } }

    const totalAdmin =  await AdminModels.count({}, (err, count)=> (count))
    const { page, limit } = await ValidatePagination(req.query)
    const listAdmin = await AdminModels.find(queryEx).sort({ time: -1 }).skip(page).limit(limit)
    
    return res.status(200).json({ data: listAdmin, rows: totalAdmin })
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
            return res.status(200).json({ msg: 'Success Add Admin' })
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(400).json({ msg: ShowErrUnique(err) })
            }
            res.status(500).json({ msg: 'error' })
        })

}

exports.EditAdmin = async (req, res) => {
    const { email, phoneNumber, name, role } = req.body
    const { unique_id } = req.query
    
    const isValidEmail = validator.validate(email)
    const isPhoneNumber = phone(phoneNumber);

    if (!isValidEmail){
        return res.status(400).json({ msg: 'invalid email' })
    }

    if (!isPhoneNumber.isValid){
        return res.status(400).json({ msg: 'invalid phone' })
    }

    const updateAdmin = await AdminModels.findOneAndUpdate({ _id: unique_id },{
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        role: role
    },{ new: true, useFindAndModify: false })


    res.status(200).json({ msg: 'Success Updated Admin' })
}

exports.DeleteAdmin = async (req, res) => {
    const { unique_id } = req.query

    const deleteAdmin = await AdminModels.findOneAndDelete({ _id: unique_id })
    return res.status(200).json({ msg: 'Success Deleted Admin' })
}