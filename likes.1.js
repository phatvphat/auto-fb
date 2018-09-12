"use strict";
const func = require('./func')


setInterval(async function () {
    var access_token = '' // Nhập Token đây, Token này mục đích get id bài viết nên sẽ không bị block
    var p = await func.request_(`https://graph.facebook.com/me/home?fields=id,message,created_time,from,comments,type&access_token=${access_token}&offset=0&limit=1`)
    // console.log(p)
    if (p.error == undefined) {
        p = JSON.parse(p)
        var id_post = p.data[0].id
        // Hàm REACT bài viết
        var data = await func.react_post(id_post.split('_')[1], 'LIKE') // 'LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'
        console.log(data)
    }
}, 1000 * 10) // Thời gian react 1 bài viết