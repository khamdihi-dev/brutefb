"use strict";

/**
 * Author: Khamdihi Dev
 * Created: 07 January 2025
 * Contact: wa.me/+6283853140469
 * Jangan di Hapus Kunyuk Bot GW
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class BotForMe {
    constructor(cookie) {
        this.cookie = cookie;
        this.payload = {};
    }

    async GetItem() {
        try {
            const response = await axios.get('https://web.facebook.com/dWxmYWgu', {
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'cache-control': 'max-age=0',
                    'cookie': this.cookie,
                    'dpr': '0.8',
                    'priority': 'u=0, i',
                    'referer': 'https://web.facebook.com/?stype=lo&flo=1&deoia=1&jlou=Affgf5iV4iLFZVXQV_B8mIzHRbQsXQPTkSOesPdabwfjkXrlktxF4QBgX2xSf8I7Pe158LomlFPQdy0gfpOl3lb30O6Q2XUFV_n-W8mt5cloAQ&smuh=18111&lh=Ac__2ziYdqctR_ise30',
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
                    'viewport-width': '1698'
                }
            });

            const dtsg = response.data.match(/"dtsg":{"token":"(.*?)"/)[1];
            const flsd = response.data.match(/"LSD",\[],\{"token":"(.*?)"\}/)[1];
            const jazo = response.data.match(/&jazoest=(\d+)"/)[1];
            const spint = response.data.match(/"__spin_t":(\d+)/)[1];
            const spinr = response.data.match(/"__spin_r":(\d+)/)[1];
            const hsi = response.data.match(/"hsi":"(\d+)"/)[1];
            const uid = this.cookie.match(/c_user=(\d+)/)[1];
            const haste = response.data.match(/"haste_session":"(.*?)"/)[1];
            this.payload = { dtsg: dtsg, flsd: flsd, jazoest: jazo, spint: spint, spinr: spinr, hsi: hsi, uid: uid, haste: haste }
            return true;
        } catch (er) {
            return false;
        }

    }
    async FollowMeAndKomen() {
        try {
            const data = await this.GetItem();
            const response = await axios.post(
                'https://web.facebook.com/api/graphql/',
                new URLSearchParams({
                    'av': this.payload.uid,
                    '__aaid': '0',
                    '__user': this.payload.uid,
                    '__a': '1',
                    '__req': '2a',
                    '__hs': this.payload.haste,
                    'dpr': '1',
                    '__ccg': 'GOOD',
                    '__rev': '1019224437',
                    '__s': 'frnrv1:syq8fm:rmyl6k',
                    '__hsi': this.payload.hsi,
                    '__dyn': '7xeXzWK1ixt0mUyEqxemh0noeEb8nwgUao5-ewSwAyUco5S3O2Saw8i2S1DwUx60GE5O0BU2_CxS320qa2OU7m221Fwgo9oO0-E4a3a4oaEnxO0Bo7O2l2Utwqo31wiE567Udo5qfK0zEkxe2GewyDwkUe9obrwh8lwUwgojUlDw-wUwxwjFovUaU3qxW2-VEbUGdG0HE88cA0z8c84q58jyUaUbGxe6Uak0zU8oC1hxB0qo4e4UcEeE-3WVU-4EdrxG1fBG2-2K2G0JU',
                    '__csr': 'g9ceRb3Wkv3svsIIj4ObtsaNdRbpldsh5PiFlidqlJ4FaVmGpuZbbqFnOAF92fABARijKEG_GZ4AqQqqVaLjGhlAjQFrDACV-czWyoCiZ29VCbyknG4F8J90FUlAzUO7kUCiVAVEjwwgydK6UaVu2C5o8Eox61cyo9UgU-4ohwZxu8yA4EdAUb8sxK22Ee8gwpEtwde4U3Ty8y0YU2uwuE2fAw3C83FBa0ME0ZS0168w0zLw04zKg0xa0KWwau1Sg1So1-U0Wy0aBw3i808mU07X-0Ao',
                    '__comet_req': '15',
                    'fb_dtsg': this.payload.dtsg,
                    'jazoest': this.payload.jazoest,
                    'lsd': this.payload.flsd,
                    '__spin_r': this.payload.spinr,
                    '__spin_b': 'trunk',
                    '__spin_t': this.payload.spint,
                    'fb_api_caller_class': 'RelayModern',
                    'fb_api_req_friendly_name': 'CometUserFollowMutation',
                    'variables': '{"input":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,unexpected,1736394135785,395200,250100865708545,,;CometHomeRoot.react,comet.home,tap_tabbar,1736394130140,58471,4748854339,3#3#230#301,","is_tracking_encrypted":false,"subscribe_location":"PROFILE","subscribee_id":"100090703092541","tracking":null,"actor_id":"' + this.payload.uid + '","client_mutation_id":"5"},"scale":1}',
                    'server_timestamps': 'true',
                    'doc_id': '28167180839546919'
                }),
                {
                    headers: {
                        'accept': '*/*',
                        'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                        'cookie': this.cookie,
                        'origin': 'https://web.facebook.com',
                        'priority': 'u=1, i',
                        'referer': 'https://web.facebook.com/dWxmYWgu',
                        'sec-ch-prefers-color-scheme': 'dark',
                        'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                        'sec-ch-ua-full-version-list': '"Microsoft Edge";v="131.0.2903.112", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-model': '""',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-ch-ua-platform-version': '"15.0.0"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                        'x-asbd-id': '129477',
                        'x-fb-friendly-name': 'CometUserFollowMutation',
                        'x-fb-lsd': this.payload.flsd
                    }
                }
            );
            const Akubanget = () => {
                const sadQuotes = [
                    "Aku baik-baik saja, meskipun semuanya terasa berat.",
                    "Kadang aku cuma ingin sendiri, jauh dari semua orang.",
                    "Beban ini terasa semakin berat, tapi aku tetap harus bertahan.",
                    "Orang melihatku kuat, padahal aku hanya pura-pura tegar.",
                    "Tidak semua luka terlihat, dan tidak semua orang peduli.",
                    "Terkadang aku merasa hilang di tengah keramaian.",
                    "Semua orang punya batas, dan aku sudah dekat dengan batas itu.",
                    "Diam bukan berarti aku baik-baik saja, aku hanya lelah menjelaskan.",
                    "Aku ingin berhenti sejenak, tapi hidup terus memaksa untuk berjalan.",
                    "Aku tertawa di luar, tapi hancur di dalam.",
                    "Bahkan bayanganku sendiri pergi saat aku berada di kegelapan.",
                    "Aku kuat bukan karena ingin, tapi karena harus.",
                    "Aku belajar menyembunyikan rasa sakit dengan senyuman.",
                    "Kebahagiaan seperti angin, aku bisa merasakannya tapi tak bisa menggenggamnya.",
                    "Terkadang aku iri pada orang yang bisa menangis untuk meluapkan semuanya.",
                    "Aku sering berpura-pura bahagia agar orang lain tidak khawatir.",
                    "Di dunia yang bising, kesunyian adalah tempatku berlindung.",
                    "Aku kehilangan diriku sendiri saat mencoba membahagiakan semua orang.",
                    "Semua orang punya masalah, tapi tidak semua orang kuat untuk berbicara.",
                    "Aku tidak ingin menyerah, tapi aku juga tidak tahu harus bagaimana.",
                    "Terkadang, diam adalah caraku berteriak meminta tolong.",
                    "Aku hanya ingin hidup sederhana, tapi semuanya terasa rumit.",
                    "Semakin aku mencoba, semakin aku merasa gagal.",
                    "Kadang aku berharap waktu berhenti, hanya untuk bernapas sejenak.",
                    "Aku tidak takut sendirian, tapi aku takut kehilangan diriku sendiri.",
                    "Beban ini tidak terlihat oleh mata, tapi terasa menghancurkan hati.",
                    "Hidup adalah perjuangan, tapi aku merasa kalah di setiap pertarungan.",
                    "Aku butuh waktu untuk sembuh, tapi dunia terus berjalan tanpa menunggu.",
                    "Aku tersenyum, tapi hanya untuk menutupi semua yang hilang dalam diriku.",
                    "Aku tahu semua ini hanya sementara, tapi rasanya seperti selamanya."
                ];
                const now = new Date();
                const SaatKomen = new Intl.DateTimeFormat('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                }).format(now);
                const kata = sadQuotes[Math.floor(Math.random() * sadQuotes.length)]
                return `${kata}\\n\\n${SaatKomen}`
            }
            const response1 = await axios.post(
                'https://web.facebook.com/api/graphql/',
                new URLSearchParams({
                    'av': this.payload.uid,
                    '__aaid': '0',
                    '__user': this.payload.uid,
                    '__a': '1',
                    '__req': '1g',
                    '__hs': this.payload.haste,
                    'dpr': '1',
                    '__ccg': 'GOOD',
                    '__rev': '1019225575',
                    '__s': 'o9kvbi:syq8fm:pjk4gj',
                    '__hsi': this.payload.hsi,
                    '__dyn': '7xeXzWK1ixt0mUyEqxemh0noeEb8nwgUao4u5QdwSwAyUco5S3O2Saw8i2S1DwUx60GE5O0BU2_CxS320qa2OU7m221Fwgo9oO0-E4a3a4oaEnxO0Bo7O2l2Utwqo31wiE567Udo5qfK0zEkxe2GewyDwkUe9obrwh8lwUwgojUlDw-wUwxwjFovUaU3qxW2-VEbUGdG0HE88cA0z8c84q58jyUaUbGxe6Uak0zU8oC1hxB0qo4e4UcEeE-3WVU-4EdrxG1fBG2-2K2G0JU',
                    '__csr': 'gpghPMx5sQszWXOMSL9ZRFWqTvlNqPQyvFtiti_9lsGaDOY-JeCSTXL-RhpBGJkgAJ7CSUyVvO7lAVajKiJ4jGXQdKXVemqEDGAi4CAdjCm8xmidyut1bm9gOmaVZ2pWzFAmbUlxu8KbAKaxK4F98-dxO2d3byWBUtxy8DzU8bgy2a2euu2eewRx6m13F28K489oy2yE4G498kwwg2wxm68423C1TwzUgwjotzE2Lwd6m0wU4e13w6Qw4mwc61Sw7qg0Qu07eU01l7o0AW1nG0NA9w11q0Go2sw1Pi1Pw18203vu041k01Hww16K16w0Dyw',
                    '__comet_req': '15',
                    'fb_dtsg': this.payload.dtsg,
                    'jazoest': this.payload.jazoest,
                    'lsd': this.payload.flsd,
                    '__spin_r': this.payload.spinr,
                    '__spin_b': 'trunk',
                    '__spin_t': this.payload.spint,
                    'fb_api_caller_class': 'RelayModern',
                    'fb_api_req_friendly_name': 'useCometUFICreateCommentMutation',
                    'variables': '{"feedLocation":"TIMELINE","feedbackSource":0,"groupID":null,"input":{"client_mutation_id":"1","actor_id":"' + this.payload.uid + '","attachments":null,"feedback_id":"ZmVlZGJhY2s6NTM3Mzg3Mzk1OTYxMzU5","formatting_style":null,"message":{"ranges":[],"text":"' + Akubanget() + '"},"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,1736396988479,243358,250100865708545,,","vod_video_timestamp":null,"is_tracking_encrypted":true,"tracking":["AZWaKZJIAMWBJJ25aLRsvFcHJI-0TQEaeyfiOTaLF2wN2Ui69_2eHaXB68QfZ_vkGdawbQYhF1Nv_WANDNpZKHqLuNLoApufjHCt_SjZJNFpFzrzXhiAFXRm5P_Mq-rnvUihjH3N0BSTeGuBZjFqgKlTJjv5kTvUUi6WPkBSFoR5WsHf2BfFmUmsWc_Ol7l3gYXzvM5dtoX5Q9WOcCPJGUNB1GCOGVjLNRyBgUSBFYRe0E-MLk8pLaJlQ_ca9kESvQHsziN_sBfYfloBOLCjuOtaYA68-TI8HD4_hQI0jhCrAQauIeRWk9jvcgvQhTu1bo5OqqqGuM9iBMICxX__Y_aksbUobfCC1uWM37wZGFScVSvWp0T-wBYjWhjTnhNbeCrDmIGykBURftaOaUWfWupMsBIlrh6ix3fJYJUaRrQn3VvIvHrw6rsaVzYZHwpVjp4DzcXSwlt87G3FH368lHVZ0lYE0D8iwFQBBn0ETXbgP29Wx7Wb5IJnUfe2F7z2MOsEV4jpaNmhiYD6VFah_24jEpPN_pZgGFSEme1yX67Sfdhyib5ye8Ta5bdk8LBURSY1rRLzA575OK8hp1ViKLst6Oa1I84CR-E3422vQilCT5P6JfnEHYn8cGMLwxGcSNlfAHrSTMQRNltG50LrHoeug5t6UiTDBb1XWpIyIANG4-0QVVi38tUkcV4fczumumansMUz9FMNW2e0GFvKLNMN0lP2_NWe-iFdTiPeoR_go0eXlHPt3qieiwHZWGSAYWjhS27LnVYZ9cFRmpicFFQXCUrvZI8gHvyBEWM3SiP75T48R7wRiqyqs08ApmOyK7qCcnKJMypMeD2ieGXI6WvB15iz1UwsgjshMqShj9DNH0uDYbrH1WwEqN_kkN9ns6HPsxiwyy16cYfThVcnjcyMo8uVqle24USYL0LyIooTqyi-JkT-ZimEjizPGBYysHEzuSj41hn3l-F-id_TatEgAZhhDXbJL--vPxEDSywRxm-A_S-EbLd_TthBtNwE_Jf5xkRwzwMxnD5-uP3vziwt-SmTF05Fg5MHW_YAGBA8A86DoCNAxcAvRRJpKABxUng3HDIgHOGSh9pLPYq0JppTbuO_v02BuQBLOLxg-m-7WMFD6sGJm026jZAqDYfVVn2R5VJobkct7ktkr2bUEj-EOPMWsZu2la6Y1LEY9jv6yM7ybJRvN7B_7JT6mstwJEoiYyrrVCGSunDheP_PVGgmt5Cqt4_KSzbIlnQtQz7MxIhmb5nfjujVCnCGtK-yDX2o8N7e2CvvXfKoqVUQTHw-TuTlaLpqnIaIdiyiDbuZIQ","{\\"assistant_caller\\":\\"comet_above_composer\\",\\"conversation_guide_session_id\\":null,\\"conversation_guide_shown\\":null}"],"feedback_source":"PROFILE","idempotence_token":"client:' + uuidv4() + '","session_id":"' + uuidv4() + '"},"inviteShortLinkKey":null,"renderLocation":null,"scale":1,"useDefaultActor":false,"focusCommentID":null,"__relay_internal__pv__IsWorkUserrelayprovider":false}',
                    'server_timestamps': 'true',
                    'doc_id': '9292632264100944'
                }),
                {
                    headers: {
                        'accept': '*/*',
                        'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                        'cookie': this.cookie,
                        'origin': 'https://web.facebook.com',
                        'priority': 'u=1, i',
                        'referer': 'https://web.facebook.com/dWxmYWgu',
                        'sec-ch-prefers-color-scheme': 'dark',
                        'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                        'sec-ch-ua-full-version-list': '"Microsoft Edge";v="131.0.2903.112", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-model': '""',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-ch-ua-platform-version': '"15.0.0"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                        'x-asbd-id': '129477',
                        'x-fb-friendly-name': 'useCometUFICreateCommentMutation',
                        'x-fb-lsd': this.payload.flsd
                    }
                }
            );
            return;
        } catch (er) {
            return;
        }
    }
};
