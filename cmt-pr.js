"use strict";
const request = require('request')
const fs = require('fs')
const func = require('./func')

var src = 'log.cmt-pr.txt'

setInterval(async function () {
    var access_token = [''] // List Token
    var pages = [320523315068360] // List ID Pages
    var cmt = 'Đã xem ✔\nĐã like ✔ ✅✅\nĐã cmt ↓↓↓↓✔ \nTt ib me☆\nQuý chủ tus ☆☆\nĐừg bơ nha <3 <3' // Cmt đây
    var b = await func.readFile_(src)
    // console.log(b)
    for (var i in access_token) {
        for (var ii in pages) {
            var p = `https://graph.facebook.com/v3.0/${pages[ii]}/feed?fields=from,type,message,full_picture,picture,source,likes,comments,attachments&limit=1&access_token=${access_token[i]}`
            var data = await func.request_(p)
            var data = JSON.parse(data)
            // console.log(data)
            if (data.error == undefined) {
                var id_post = data.data[0].id
                if (data.data[0].from != undefined && data.data[0].from.id == pages[ii] && !b.includes(id_post)) {
                    var p_ = `https://graph.facebook.com/${id_post}/comments?method=post&message=${encodeURIComponent(cmt)}&access_token=${access_token[i]}`
                    func.writeFile_(src, id_post)
                    var data_ = await func.request_(p_)
                    var data_ = JSON.parse(data_)
                    console.log(data_)
                }
            }
        }
    }
}, 1000 * 45) // Set time loop

// function rand_t() { console.log((Math.floor(Math.random() * 20) + 30) * 1000) }
// setInterval(rand_t, 1000)