const fs = require('fs');
const path = require('path')
const logo = require('./logo');
const axios = require('axios');
const readline = require('readline');

console.clear()

class DumpMetaUser {
    constructor(userid) {
        const token = fs.readFileSync('token.txt', 'utf8');
        const cokie = fs.readFileSync('cokie.txt', 'utf8');
        this.token = token.trim();
        this.cokie = cokie.trim();
        this.fried = [];
        this.apifb = `https://graph.facebook.com/v16.0/${userid}/friends`;
    }

    async GetFriends(afters) {
        try {
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
                }
            });

            for (const data of response.data.data) {
                const user = `${data.id}|${data.name}`;
                if (!this.fried.includes(user)) {
                    this.fried.push(user);
                    process.stdout.write(`\r sucess dump : ${this.fried.length}`);
                }
            }
            const after = response.data.paging.cursors.after;
            await this.GetFriends(after);
        } catch (error) {
            return;
        }
    }
};

class LoginUser {
    constructor() {
        this.url = 'https://adsmanager.facebook.com/adsmanager/onboarding'
    }

    async LoginWithCokie() {
        try {
            logo()
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
            const UserAct = response.data.match(/act=(\d+)&amp/)
            if (!UserAct) {
                console.log('Login failed, try again');
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
            fs.writeFileSync('data/token.txt',token,'utf-8')
            fs.writeFileSync('data/cokie.txt',cokie,'utf-8')
            console.log(`\nLogin berhasil -> node ${path.basename(process.argv[1])}`);
        } catch(er) {
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

var run = new LoginUser()
run.LoginWithCokie()

