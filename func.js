const request = require('request')
const fs = require('fs')
const login = require("facebook-chat-api")
const moment = require('moment')


var func = module.exports = {}
var globals_ = {}

func.TimeDate = function (type = '') {
    // var d = new Date()
    // var timeStamp = d.getTime()
    // return timeStamp
    switch (type) {
        case 'ddd':
            return moment.unix(moment().unix()).format("ddd");
            break;
        case 'HH':
            return Number(moment.unix(moment().unix()).format("HH"));
            break;
        case 'mm':
            return Number(moment.unix(moment().unix()).format("mm"));
            break;
        default: return moment().unix();
    }
}
func.randNum = function (from = 1, to = 2) {
    return Math.floor((Math.random() * Number(to)) + Number(from))
}

func.readFile_ = async (src) => {
    return await new Promise(function (resolve, reject) {
        if (fs.existsSync(src)) {
            fs.readFile(src, 'utf-8', function (err, buf) {
                if (err) reject(err)
                let a = buf.toString()
                // console.log(a)
                resolve(a)
            })
        } else {
            fs.writeFileSync(src, '')
            resolve('')
        }
    })
}
func.writeFile_ = (src, text) => {
    fs.appendFile(src, `${text}\n`, function (err) {
        if (err) throw err
        console.log('Updated list id post!')
    })
}

async function request__(p, method = 'GET', headers = {}, form = {}, followRedirect = false) {
    return new Promise((resolve, reject) => {
        // console.log(form)
        request({ method: method, url: p, headers: headers, form: form, followRedirect: followRedirect }, async function (error, response, body) {
            if (error) reject(error)
            // console.log(body)
            if (method != 'GET') { body = response.headers.location }
            resolve(body)
        })
    })
}
func.request_ = async (p, method = 'GET', headers = {}, form = {}) => {
    var aa = await request__(p, method = 'GET', headers = {}, form = {})
    return new Promise((resolve, reject) => {
        // console.log(form)
        request({ method: method, url: p, headers: headers, form: form }, async function (error, response, body) {
            if (error) reject(error)
            // console.log(response.headers.location)
            if (method != 'GET') { body = response.headers.location }
            resolve(body)
        })
    })
    return aa
}

func.login = async function (username, password) {
    if (fs.existsSync('appstate.json')) {
        login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, async (err, api) => {
            if (err) {
                login({ email: username, password: password }, (err, api) => {
                    if (err) return console.error(err)
                    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState())) // Đăng nhập lưu cookie
                })
            }
        })
    } else {
        login({ email: username, password: password }, (err, api) => {
            if (err) return console.error(err)
            fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState())) // Đăng nhập lưu cookie
        })
    }
}

func.isOdd = function (num) { return num % 2; }


// Hàm tương tác

async function cookie_() {
    var src = 'appstate.json'
    var a = await func.readFile_(src)
    var b = JSON.parse(a, 'utf8')
    var c = b.length
    var cookie = ''
    for (let i = 0; i < c; i++) {
        cookie += b[i].key + '=' + b[i].value + ';'
    }
    cookie = cookie.substring(0, cookie.length - 1)
    // console.log(cookie)
    return cookie
}
async function fb_dtsg() {
    var a = await cookie_()
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': a
    }
    if (globals_['fb_dtsg'] == undefined) {
        var data = await request__('https://www.facebook.com', 'GET', headers)
        data = data.match(/name="fb_dtsg" value="(.*)" autocomplete="off" \/><input/ig)
        data = data[0].replace('name="fb_dtsg" value="', '')
        data = data.replace('" autocomplete="off" /><input', '')
        globals_['fb_dtsg'] = data
    } else { data = globals_['fb_dtsg'] }
    // console.log(data)
    return data
}
func.access_token = async function () {
    var a = await cookie_()
    // console.log(a)
    var b = a.match(/;c_user=(.*);xs/i)
    b = b[0].replace(';c_user=', '')
    b = b.replace(';xs', '')
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': a
    }
    if (globals_['access_token'] == undefined) {
        var data_ = await request__('https://www.facebook.com/profile.php?id=' + b, 'GET', headers, {}, true)
        data = data_.match(/<a accesskey="7" class="accessible_elem" href="https:\/\/www.facebook.com\/(.*)\/allactivity\?privacy_source/)
        if (data != null) {
            data = data[0].replace('<a accesskey="7" class="accessible_elem" href="https://www.facebook.com/', '')
            data = data.replace('/allactivity?privacy_source', '')

            var data = await request__('https://www.facebook.com/' + data, 'GET', headers, {})
        } else {
            var data = data_
        }
        data = data.match(/multi_partitioning_enabled:false,access_token:"(.*)",resumability_enabled/)
        data = data[0].split('",resumability_enabled')[0]
        data = data.replace('multi_partitioning_enabled:false,access_token:"', '')
        globals_['access_token'] = data
    } else { data = globals_['access_token'] }
    console.log(data)
    return data
}
// access_token()
// Đăng Nhận xét
func.cmt = async (id_post, comment_text) => {
    var a = await cookie_()
    var b = await fb_dtsg()
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': a,
        'x-requested-with': 'XMLHttpRequest',
        'x-response-format': 'JSONStream',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'vi,en;q=0.9'
    }
    var form = {
        comment_text: comment_text,
        fb_dtsg: b
    }
    var data = await request__('https://m.facebook.com/a/comment.php?ft_ent_identifier=' + id_post, 'POST', headers, form)
    data = data.match(/&id=(.*)/ig)
    data = data[0].replace('&id=', '')
    data = data.replace('&_rdr#', '_' + id_post + '_')
    console.log('Đã nhận xét. ID:', data)
    return data
}
// Xoá Nhận Xét
func.del_cmt = async (id_post, id_cmt) => {
    var a = await cookie_()
    var b = await fb_dtsg()
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': a,
        'x-requested-with': 'XMLHttpRequest',
        'x-response-format': 'JSONStream',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'vi,en;q=0.9'
    }
    var form = {
        fb_dtsg: b
    }
    var data = await request__('https://m.facebook.com/ufi/delete/?delete_comment_id=' + id_cmt + '&delete_comment_fbid=' + id_cmt + '&ft_ent_identifier=' + id_post, 'POST', headers, form)
    console.log('Đã xoá nhận xét. ID:', id_cmt)
}
// React bài viết
func.react_post = async (id_post, reaction_type = 'like') => {
    var a = await cookie_()
    var b = await fb_dtsg()
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': a
    }
    reaction_type = reaction_type.toLowerCase()
    if (reaction_type == 'like') { reaction_type = 1 }
    else if (reaction_type == 'love') { reaction_type = 2 }
    else if (reaction_type == 'haha') { reaction_type = 3 }
    else if (reaction_type == 'wow') { reaction_type = 4 }
    else if (reaction_type == 'sad') { reaction_type = 5 }
    else if (reaction_type == 'angry') { reaction_type = 6 }
    else { reaction_type = 0 }
    var form = {
        reaction_type: 1,
        ft_ent_identifier: id_post,
        fb_dtsg: b
    }
    var data = await request__('https://m.facebook.com/ufi/reaction/?ft_ent_identifier=' + id_post, 'POST', headers, form)
    // data = data.match(/&id=(.*)/ig)
    // data = data[0].replace('&id=', '')
    // data = data.replace('&_rdr#', '_' + id_post + '_')
    console.log('Đã like.', id_post)
    return data
}
