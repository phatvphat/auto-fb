"use strict";
const func = require('./func')

var func_ = module.exports = {}


var src = './log/log.cmt-pr.txt'

func_.cmt_pr = async function (CMT, arr_ids) {
    var access_token = await func.access_token
    var arr_ids_ = arr_ids[Math.floor(Math.random() * arr_ids.length)]
    var pages = [arr_ids_] // List IDs
    var cmt = CMT
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
}