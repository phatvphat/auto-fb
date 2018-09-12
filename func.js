const request = require('request')
const fs = require('fs')

var func = module.exports = {}
var globals_ = {}

func.readFile_ = async (src) => {
    return await new Promise(function (resolve, reject) {
        fs.readFile(src, 'utf-8', function (err, buf) {
            if (err) reject(err)
            let a = buf.toString()
            // console.log(a)
            resolve(a)
        })
    })
}
func.writeFile_ = (src, text) => {
    fs.appendFile(src, `${text}\n`, function (err) {
        if (err) throw err
        console.log('Updated list id post!')
    })
}

func.request_ = async (p, method = 'GET', headers = {}, form = {}) => {
    return new Promise((resolve, reject) => {
        // console.log(form)
        request({ method: method, url: p, headers: headers, form: form }, async function (error, response, body) {
            if (error) reject(error)
            // console.log(response.headers.location)
            if (method != 'GET') { body = response.headers.location }
            resolve(body)
        })
    })
}

// Hàm tương tác

async function request__(p, method = 'GET', headers = {}, form = {}) {
    return new Promise((resolve, reject) => {
        // console.log(form)
        request({ method: method, url: p, headers: headers, form: form }, async function (error, response, body) {
            if (error) reject(error)
            // console.log(response.headers.location)
            if (method != 'GET') { body = response.headers.location }
            resolve(body)
        })
    })
}

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
        var data = await request__('https://m.facebook.com', 'GET', headers)
        data = data.match(/name="fb_dtsg" value="(.*)" autocomplete="off" \/><input/ig)
        data = data[0].replace('name="fb_dtsg" value="', '')
        data = data.replace('" autocomplete="off" /><input', '')
        globals_['fb_dtsg'] = data
    } else { data = globals_['fb_dtsg'] }
    // console.log(data)
    return data
}
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
    console.log('Đã xoá nhận xét.')
}
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
