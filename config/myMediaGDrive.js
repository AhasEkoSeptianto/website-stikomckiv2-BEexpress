const { google } = require('googleapis')
const path = require('path')
const {authenticate} = require('@google-cloud/local-auth');

const fs = require('fs')
// const CLIENT_ID = '1053829962297-1b1rvntd84i9na3hoikdk4l8pgmdkk7a.apps.googleusercontent.com'
// const CLIENT_SECRET = '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'
// const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REDIRECT_URL = 'http://localhost:3000'
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// const REFRESH_TOKEN = '1//04STiHkZQrlCqCgYIARAAGAQSNwF-L9IrcyS_X-54GqhgPYPQTXgAu1uIMRaebfJTeM-dl0Eiqct2Nrq8JEVqLC-AaiKrz30ctWA'

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'config/token.json');


// inisiate null 
var CLIENT_ID = ``
var CLIENT_SECRET = ''
var REFRESH_TOKEN = ``
var oauth2Client = null
var drive = null

const GETDATA_AUTH = async () => {
    const TOKEN = await fs.readFileSync(TOKEN_PATH)
  
    const keys = JSON.parse(TOKEN);
    return { CLIENT_ID: keys.client_id, CLIENT_SECRET: keys.client_secret, REFRESH_TOKEN: keys.refresh_token } 
  }
  
  GETDATA_AUTH()
    .then( async ({ CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN }) => {
      
      oauth2Client = await new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
      await oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })    
  
        CLIENT_ID = CLIENT_ID
        CLIENT_SECRET = CLIENT_SECRET
        REFRESH_TOKEN = REFRESH_TOKEN
      
      drive = await google.drive({
        version: 'v3',
        auth: oauth2Client
      })
    })

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
// const drive = google.drive({version: 'v3', auth: oauth2Client});

// const oauth2Client = null

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
        return;
    }   
}

async function uploadMedia(file){
    // file?.mv('./my-temp/' + file.name)
    // var bitmap = fs.readFileSync(file.tempFilePath, 'base64');
    
    
    // var base64Data = bitmap.replace(/^data:image\/png;base64,/, "");
    // fs.writeFileSync(file.name, base64Data, 'base64')

    // console.log(bitmap)
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimetype,
                parents: [FolderIDGDrive]
            },
            media: {
                mimeType: file.mimetype,
                // body: file.data
                body:  fs.createReadStream(file.tempFilePath)
                // body: fs.writeFile(file.name, base64Data, 'base64', (err) => {})
            },
        })
        // fs.unlink(`./my-temp/${file.name}`, (err) => {if (err) throw err;})
        
        return response.data.id
    } catch (error) {
        console.log(error)
    }
}

async function DeleteMedia(file_id){
    try {
        const response = await drive.files.delete({
            fileId: file_id
        })
    } catch (error) {
    }
}

async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }
  
  /**
   * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
   *
   * @param {OAuth2Client} client
   * @return {Promise<void>}
   */
  async function saveCredentials(client) {
    const content = await fs.readFileSync(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFileSync(TOKEN_PATH, payload);
  }
  
  /**
   * Load or request or authorization to call APIs.
   *
   */
  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }
  
  async function GetGDriveAuthLink(){
    const authUrl = await oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    return authUrl
  }

  async function AuthGDrive(code){
    let token = await oauth2Client.getToken(code)
    return token
  }

module.exports.AuthGDrive = AuthGDrive
module.exports.GetGDriveAuthLink = GetGDriveAuthLink
module.exports.authorize = authorize
module.exports.listFile = listFile
module.exports.uploadMedia = uploadMedia
module.exports.DeleteMedia = DeleteMedia