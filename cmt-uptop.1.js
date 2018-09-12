"use strict";
const func = require('./func')


setInterval(async function () {
    var arr_ids_post = [] // List id post cần cmt UPTOP
    var cmt = 'Đã xem ✔\nĐã like ✔ ✅✅\nĐã cmt ↓↓↓↓✔ \nTt ib me☆\nQuý chủ tus ☆☆\nĐừg bơ nha <3 <3' // Cmt đây
    for (var id_post in arr_ids_post) {
        // Hàm NHẬN XÉT
        var ab = await func.cmt(id_post, cmt)
        ab = ab.split('_')
        // Hàm XOÁ NHẬN XÉT
        if (ab != undefined) {
            setTimeout(async () => {
                var ac = await func.del_cmt(ab[1], ab[2])
            }, 1000 * 10)
        }
    }
}, 1000 * 20) // Thời gian cmt 1 bài viết (gồm thời gian xoá bài sau khi cmt)