"use strict";
const func = require('./func')

var func_ = module.exports = {}


var src = './log/log.likes.txt'
var arr_likes = {}

// moment().unix();
var i = 0
var ii = 0
async function loop(REACT, to) {
    setTimeout(async function () {
        console.log(REACT, i, to)
        var access_token = await func.access_token()
        var p = await func.request_(`https://graph.facebook.com/me/home?fields=id,message,created_time,from,comments,type&access_token=${access_token}&offset=0&limit=1`)
        var b = await func.readFile_(src)
        if (p.error == undefined) {
            p = JSON.parse(p)
            console.log(p)
            var id_post = p.data[0].id
            // Hàm REACT bài viết
            if (!b.includes(id_post)) {
                func.writeFile_(src, id_post)
                // var data = await func.react_post(id_post.split('_')[1], REACT) // 'LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'
                // console.log(data)
            }
        }
        i++
        if (i < to) {
            loop(REACT, to)
        } else { i = 0 }
    }, 1000 * 60 * 2)
}
func_.react_post = function (REACT) {
    if (7 < func.TimeDate('HH') && func.TimeDate('HH') < 23) {
        console.log('REACT_POST: active')
        loop(REACT, func.randNum(3, 4))
    } else { console.log('REACT_POST: inactive') }
}