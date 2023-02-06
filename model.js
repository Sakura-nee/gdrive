'use stric'
const axios = require('axios');
const YuukiGDrive = require('./lib/gdrive');
const path = require('path');

const yuuki = new YuukiGDrive

async function download() {
    const url = 'https://civitai-prod-settled.5ac0637cfd0766c97916cefa3764fbdf.r2.cloudflarestorage.com/76164/model/chilloutmix.8Rrd.safetensors'
    const response = await axios.get(url, {
        params: {
            'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
            'X-Amz-Content-Sha256': 'UNSIGNED-PAYLOAD',
            'X-Amz-Credential': '2fea663d76bd24a496545da373d610fc/20230206/auto/s3/aws4_request',
            'X-Amz-Date': '20230206T080928Z',
            'X-Amz-Expires': '86400',
            'X-Amz-Signature': 'f65293fa97f2a2f5c8c9ae270b5cd3b3a1211e6ed6076fccf88e55c4f25b35dd',
            'X-Amz-SignedHeaders': 'host',
            'response-content-disposition': 'attachment; filename="chilloutmix_.safetensors"',
            'x-id': 'GetObject'
        },
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Connection': 'keep-alive',
            'Referer': 'https://civitai.com/',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        },
        responseType: 'stream'
    });

    const basename = path.basename(url)
    const drive = await yuuki.remote_file(basename, response, '1xE5rj_4t-IiWm1Q24WNoBK4IjVHOzkvo')
    console.log(drive)
}
