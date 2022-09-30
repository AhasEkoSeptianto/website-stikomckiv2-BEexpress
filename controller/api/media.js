const { authorize, GetGDriveAuthLink, AuthGDrive } = require('../../config/myMediaGDrive')

exports.AuthMediaLink = async (req, res) => {
    let linkUri = await GetGDriveAuthLink()
    
    res.send({ message: 'Success', uri: linkUri })
}

exports.GetTokenGoogle = async (req, res) => {
    if (req.body.code === null){
        return res.status(400).send('invalid request')
    }

    try{
        let auth = await AuthGDrive(req.body.code)
        res.send({ msg: 'oke', data: auth.res.data })
    }catch(err){
        console.log(err)
        res.status(400).send('invalid request')
    }

}