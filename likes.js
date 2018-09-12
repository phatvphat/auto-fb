const request = require('request')

setInterval(function () {
    var access_token = ''
    var p = `https://graph.facebook.com/me/home?fields=id,message,created_time,from,comments,type&access_token=${access_token}&offset=0&limit=1`
    request({ method: 'GET', url: p }, async function (error, response, body) {
        var body = JSON.parse(body)
        console.log(body)
        var reaction = 'LIKE'
        request({ method: 'GET', url: 'https://graph.facebook.com/' + body.data[0].id + '/reactions?type=' + (reaction) + '&method=post&access_token=' + access_token }, async function (error, response, body) {
            var body = JSON.parse(body)
            console.log(body)
        })
    })
}, 600000)