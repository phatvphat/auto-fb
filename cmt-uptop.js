"use strict";
const request = require('request')
const fs = require('fs')
const func = require('./func')


setInterval(async function () {
    var access_token = [''] // List Token
    var posts = [] // List ID posts, id thôi k cần dạng xxx_yyy
    var cmt = 'Đã xem ✔\nĐã like ✔ ✅✅\nĐã cmt ↓↓↓↓✔ \nTt ib me☆\nQuý chủ tus ☆☆\nĐừg bơ nha <3 <3' // Cmt đây
    // console.log(b)
    for (var i in access_token) {
        for (var ii in posts) {
            var p = `https://graph.facebook.com/${posts[ii]}/?access_token=${access_token[i]}`
            var data = await func.request_(p)
            var data = JSON.parse(data)
            // console.log(data)
            if (data.error == undefined) {
                var id_post = data.id
                if (data.from != undefined) {
                    var p_ = `https://graph.facebook.com/${id_post}/comments?method=post&message=${encodeURIComponent(cmt)}&access_token=${access_token[i]}`
                    var data_ = await func.request_(p_)
                    var data_ = JSON.parse(data_)
                    console.log(data_)
                    if (data_.error == undefined) {
                        setTimeout(async function () {
                            var p__ = `https://graph.facebook.com/${data_.id}/?method=delete&access_token=${access_token[i]}`
                            var data__ = await func.request_(p__)
                            var data__ = JSON.parse(data__)
                            console.log(data__)
                        }, 1000 * 10) // Thời gian xoá cmt
                    }
                }
            }
        }
    }
}, 1000 * 30) // Set time loop