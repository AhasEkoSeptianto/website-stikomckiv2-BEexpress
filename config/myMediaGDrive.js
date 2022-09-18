const { google } = require('googleapis')
const fs = require('fs')
const CLIENT_ID = '1053829962297-1b1rvntd84i9na3hoikdk4l8pgmdkk7a.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04STiHkZQrlCqCgYIARAAGAQSNwF-L9IrcyS_X-54GqhgPYPQTXgAu1uIMRaebfJTeM-dl0Eiqct2Nrq8JEVqLC-AaiKrz30ctWA'
const oauth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const drive = google.drive({version: 'v3', auth: oauth2Client});
exports.oauth2Client = oauth2Client
exports.drive = drive

const FolderIDGDrive = '1yvYsyc_USWXbVUs9_LF4e9nDsiNrJpHm' // website stikomckid

async function listFile(){
    const file = await drive.files.list({
        //   pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
        q: `'1yvYsyc_USWXbVUs9_LF4e9nDsiNrJpHm' in parents`
    })
    
    const files = file.data.files;
    if (files.length === 0) {
        console.log('No files found.');
        return;
    }   
}

async function uploadMedia(file){
    file?.mv('./my-temp/' + file.name)
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimetype,
                parents: [FolderIDGDrive]
            },
            media: {
                mimeType: file.mimetype,
                body:  fs.createReadStream(`./my-temp/${file.name}`)
            },
        })
        fs.unlink(`./my-temp/${file.name}`, (err) => {if (err) throw err;})
        // console.log(response.data)
        return response.data.id
    } catch (error) {
        console.log(error.message)
    }
}

async function DeleteMedia(file_id){
    try {
        const response = await drive.files.delete({
            fileId: file_id
        })
        console.log(response.data, response.status)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.listFile = listFile
module.exports.uploadMedia = uploadMedia
module.exports.DeleteMedia = DeleteMedia