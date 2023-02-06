'use stric'
const { google } = require('googleapis')
const fs = require('fs')
const process = require('process')
const axios = require('axios')
const path = require('path')
const config = require('../config.json')
const terminal = require('terminal-kit').terminal


class YuukiGDrive {
    constructor() {
        this.auth = new google.auth.OAuth2(
            config.endpoint.client_id,
            config.endpoint.clinet_secret,
            config.callback
        )
        this.auth.setCredentials({
            refresh_token: config.refresh_token
        })

        this.root = config.gdrive_options.docroot
        this.progress = null
    }

    async init() {
        const auth = await this.auth
        return await google.drive({
            version: 'v3',
            auth
        })
    }

    async remote_file(file_name, stream, drive_id=this.root) {
        if (!file_name) throw new Error('file_name is required!')
        if (!stream) throw new Error('stream is required!')

        const drive = await this.init()
        const file_basename = path.basename(file_name)

        const metadata = { name: file_basename, parents: [drive_id] }
        const media = { body: stream.data }

        const total_length = stream.headers['content-length'];

        // write progressbar
        const progress = terminal.progressBar({
            width: 50,
            title: file_basename,
            eta: true,
            percent: true
        })

        const upload_data = await drive.files.create({
            resource: metadata,
            media: media
        }, {
            onUploadProgress: async function(e) {
                progress.update(e.bytesRead / total_length)
            }
        })
        
        terminal('\n')
        return true
    }

    async local_file(file_name, drive_id=this.root) {
        if (!file_name) throw new Error('file_name is required!')

        const drive = await this.init()
        const file_basename = path.basename(file_name)

        const stream = fs.createReadStream(file_name)
        const stat = fs.statSync(file_name)

        const metadata = { name: file_basename, parents: [drive_id] }
        const media = { body: stream }

        const total_length = stat.size

        // write progressbar
        const progress = terminal.progressBar({
            width: 50,
            title: file_basename,
            eta: true,
            percent: true
        })

        const upload_data = await drive.files.create({
            resource: metadata,
            media: media
        }, {
            onUploadProgress: async function(e) {
                progress.update(e.bytesRead / total_length)
            }
        })
        
        terminal('\n')
    }

    async progressbar(update, title, uploaded, total_length) {
        if (update) {
            this.progress.update(uploaded / total_length)
        } else {
            this.progress = terminal.progressBar({
                width: 70,
                title: title
             })
        }
        return true
    }
}

module.exports = YuukiGDrive