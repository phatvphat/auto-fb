/*
    const PvP = 'fb.com/pvp.sad' <3

        ~(˘▾˘~)
    ~~
*/

"use strict";
const func = require('./func')
const react_post = require('./likes.1')
const cmt_pr = require('./cmt-pr.1')
const cmt_uptop = require('./cmt-uptop.1')

// ---------- START SETTING ---------- //
var config = {
    username: 'pvp.sad', // Tên đăng nhập FB
    password: 'pvp.2001', // Mật khẩu FB

    MODE_REACT_POST: true, // Bật hoặc Tắt chức năng REACT bài viết bạn bè
    REACT: 'LIKE', // 'LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY' || Tương tác bài viết bạn bè
    TIME_REACT_POST: 5, // Thời gian nghỉ sau số lần lặp (phút)

    MODE_CMT_PR: false, // Bật hoặc Tắt chức năng Nhận xét quảng bá nội dung
    CMT_PR: 'Đã xem ✔\nĐã like ✔ ✅✅\nĐã cmt ↓↓↓↓✔ \nTt ib me☆\nQuý chủ tus ☆☆\nĐừg bơ nha <3 <3', // Nhận xét quảng bá nội dung
    ARR_CMT_PR_IDS: [''], // Danh sách id người dùng, page hoặc nhóm
    TIME_CMT_PR: 5, // Thời gian lặp lại (phút)

    // MODE_CMT_UPTOP: false, // Bật hoặc Tắt chức năng Nhận xét bumpp bài viết nhóm hoặc trang
    // CMT_UPTOP: 'Đã xem ✔\nĐã like ✔ ✅✅\nĐã cmt ↓↓↓↓✔ \nTt ib me☆\nQuý chủ tus ☆☆\nĐừg bơ nha <3 <3', // Nhận xét bumpp bài viết nhóm hoặc trang
    // ARR_CMT_UPTOP_IDS: [''], // Danh sách id bài viết
    // TIME_CMT_UPTOP: 50 // Thời gian lặp lại + thời gian xoá và đăng lại (giây)
}
// ---------- END SETTING ---------- //


// ---------- START TOOLS ---------- // ---------- Please do not edit the content below if you really understand it (including related files) ---------- //
setInterval(function () {
    console.log('Running...')
}, 1000 * 5)
// LOGIN
func.login(config.username, config.password)
// REACT_POST
if (config.MODE_REACT_POST == true) {
    setTimeout(react_post.react_post, 1000 * 15, config.REACT)
    setInterval(react_post.react_post, 1000 * 60 * (10 + config.TIME_REACT_POST), config.REACT)
}
// CMT_PR
if (config.MODE_CMT_PR == true) {
    setInterval(cmt_pr.cmt_pr, 1000 * 60 * config.TIME_CMT_PR, config.CMT_PR, config.ARR_CMT_PR_IDS)
}
// ---------- END TOOLS ---------- //
