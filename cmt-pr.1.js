"use strict";
const func = require('./func')


var src = 'log.cmt-pr.txt'

setInterval(async function () {
    var access_token = '' // Nhập Token đây, Token này mục đích get id bài viết nên sẽ không bị block
    var pages = [320523315068360] // List ID Pages
    var cmt = 'Đã xem ✔\nĐã like ✔ ✅✅\nĐã cmt ↓↓↓↓✔ \nTt ib me☆\nQuý chủ tus ☆☆\nĐừg bơ nha <3 <3' // Cmt đây
    var b = await func.readFile_(src)
    // console.log(b)
    for (var ii in pages) {
        var p = `https://graph.facebook.com/v3.0/${pages[ii]}/feed?fields=from,type,message,full_picture,picture,source,likes,comments,attachments&limit=1&access_token=${access_token}`
        var data = await func.request_(p)
        var data = JSON.parse(data)
        // console.log(data)
        if (data.error == undefined) {
            var id_post = data.data[0].id
            if (data.data[0].from != undefined && data.data[0].from.id == pages[ii] && !b.includes(id_post)) {
                func.writeFile_(src, id_post)
                var data_ = await func.cmt(id_post, cmt)
                console.log(data_)
            }
        }
    }
}, 1000 * 45) // Thời gian cmt dạo 1 bài viết