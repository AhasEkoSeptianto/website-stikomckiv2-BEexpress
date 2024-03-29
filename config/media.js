const { google } = require('googleapis')
const {authenticate} = require('@google-cloud/local-auth');
const path = require('path')
const fs = require('fs')
const oauth2Client = require('./myMediaGDrive')
const drive = require('./myMediaGDrive')
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const filepath = path.join(__dirname, 'nimek.jpg')
const FolderIDGDrive = '1yvYsyc_USWXbVUs9_LF4e9nDsiNrJpHm' // website stikomckid

exports.upload = async () => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'anime.jpg',
                mimeType: 'image/jpg',
                parents: [FolderIDGDrive]
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filepath)
            },
        })

    } catch (error) {

    }
}

// upload()

exports.Delete = async () => {
    try {
        const response = await drive.files.delete({
            fileId: '106_AKvhirNM5ZWfWHMsojrgPuZqfoshR'
        })

    } catch (error) {

    }
}

// Delete()

async function GeneratedPublicUrl(){
    try {
        const fileId = '1gL8F-0WlyZENJTvN6NGEu2KJ4cb48ddA'
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })

    } catch (error) {
    
    }
}

// GeneratedPublicUrl()

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
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
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
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
  
  /**
   * Lists the names and IDs of up to 10 files.
   * @param {OAuth2Client} authClient An authorized OAuth2 client.
   */

  async function listFiles(){
    const res = await drive?.files?.list({
        //   pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
        q: `'1yvYsyc_USWXbVUs9_LF4e9nDsiNrJpHm' in parents`
    })
    const files = res.data.files;
    if (files.length === 0) {
      return;
    }
  
    files.map((file) => {
    });
  }
  
  module.exports.listFiles = listFiles
  module.exports.upload = this.upload
  module.exports.Delete = this.Delete
//   authorize().then(listFiles).catch(console.error);
// listFiles(oauth2Client)
// upload()
// Delete()
