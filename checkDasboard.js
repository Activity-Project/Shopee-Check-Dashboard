import fetch from "node-fetch";
import readlineSync from "readline-sync";
import chalk from "chalk";
import delay from 'delay';
import fs, {
    read
} from 'fs';
import terminalImage from 'terminal-image';
import machineIdSync from 'node-unique-machine-id';
import {
    time
} from "console";
import {
    stringify
} from "querystring";

function showData(cookie, sessionid) {
    const index = fetch('https://creator.shopee.co.id/supply/api/lm/sellercenter/realtime/dashboard/overview?sessionId=' + sessionid + '', {
            headers: {
                'Host': 'creator.shopee.co.id',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
                'Accept': 'application/json',
                'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://creator.shopee.co.id/dashboard/live/55196618',
                'Content-Type': 'application/json',
                'X-Traceid': 'T6hbN-koq2tZwtQ4LM5hV',
                'Language': 'en',
                'X-Region': 'id',
                'X-Region-Domain': 'co.id',
                'X-Region-Timezone': '+0700',
                'X-Env': 'live',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Te': 'trailers',
                'Cookie': cookie
            }
        })

        .then(async res => {
            const data = await res.json()
            return data
        })
    return index
}

function infoAccount(cookie) {
    const index = fetch('https://shopee.co.id/api/v4/account/basic/get_account_info', {
            headers: {
                'Host': 'shopee.co.id',
                'Sec-Ch-Ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                'Sec-Ch-Ua-Mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'X-Api-Source': 'pc',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Shopee-Language': 'id',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Ch-Ua-Platform': '"macOS"',
                'Sec-Gpc': '1',
                'Accept-Language': 'id-ID,id;q=0.6',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': cookie
            }
        })

        .then(async res => {
            const data = await res.json()
            return data;
        })
    return index
}

function checkSession(cookie) {
    const index = fetch('https://live.shopee.co.id/webapi/v1/session', {
            headers: {
                'Host': 'live.shopee.co.id',
                'Sec-Ch-Ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                'Sec-Ch-Ua-Mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'X-Api-Source': 'pc',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Shopee-Language': 'id',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Ch-Ua-Platform': '"macOS"',
                'Sec-Gpc': '1',
                'Accept-Language': 'id-ID,id;q=0.6',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': cookie
            }
        })

        .then(async res => {
            const data = await res.json()
            return data
        })
    return index
}
(async () => {
    console.log(chalk.white('[') + chalk.green('!') + chalk.white(']'), `Checking dashboard live`)
    console.log()
    var cookie = fs.readFileSync('cookieShopee.txt', 'UTF-8');
    const infoAcc = await infoAccount(cookie);
    const name = infoAcc.data.username;
    const email = infoAcc.data.email;
    const phone = infoAcc.data.phone;

    console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Sukses Login Dengan Data`);
    console.log(chalk.white(`    Nama  : `) + chalk.yellow(name))
    console.log(chalk.white(`    Email : `) + chalk.yellow(email))
    console.log(chalk.white(`    Phone : `) + chalk.yellow(phone))
    console.log()

    const checkSessiondata = await checkSession(cookie);
    console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Session Ditemukan`);
    console.log(chalk.white(`    Session ID    : `) + chalk.yellow(checkSessiondata.data.session.session_id))
    console.log(chalk.white(`    Room ID       : `) + chalk.yellow(checkSessiondata.data.session.room_id))
    console.log(chalk.white(`    Chatrooom ID  : `) + chalk.yellow(checkSessiondata.data.session.chatroom_id))
    console.log(chalk.white(`    Device ID     : `) + chalk.yellow(checkSessiondata.data.session.device_id))
    console.log()

    while (true) {
        var session = checkSessiondata.data.session.session_id;

        const show = await showData(cookie, session);
        try {
            const placedOrder = show.data.placedOrder
            const placedGmv = show.data.placedGmv
            const like = show.data.engagementData.likes
            const comment = show.data.engagementData.comments
            const viewers = show.data.engagementData.viewers
            const shares = show.data.engagementData.shares

            const formatRupiah = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
              }).format(placedGmv);
            console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Data Ditemukan`);
            console.log(chalk.white(`    Session ID    : `) + chalk.yellow(checkSessiondata.data.session.session_id))
            console.log(chalk.white(`    Placed Order  : `) + chalk.yellow(placedOrder))
            console.log(chalk.white(`    Total Ravenue : `) + chalk.yellow(formatRupiah))
            console.log(chalk.white(`    Like          : `) + chalk.yellow(like))
            console.log(chalk.white(`    Comment       : `) + chalk.yellow(comment))
            console.log(chalk.white(`    Viewers       : `) + chalk.yellow(viewers))
            console.log(chalk.white(`    Shares        : `) + chalk.yellow(shares))
            console.log()
            console.log(chalk.yellow(`Waiting for 15 seconds`))
            console.log()
            await delay(15000)
        } catch (err) {

        }
    }
})();