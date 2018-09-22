"use strict";
const func = require('./func')

var func_ = module.exports = {}


var src = 'log.cmt-pr.txt'

func_.cmt_uptop = async function (CMT, arr_ids) {
    var arr_ids_post = arr_ids // List id post cần cmt UPTOP
    var cmt = CMT
    for (var id_post in arr_ids_post) {
        var ab = await func.cmt(arr_ids_post[id_post], cmt) // Nhận xét
        ab = ab.split('_')
        if (ab != undefined) {
            var ac = await func.del_cmt(ab[1], ab[2]) // Xoá cmt
            // setTimeout(async () => {
            // }, 1000 * 10)
        }
    }
}