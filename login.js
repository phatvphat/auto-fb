const fs = require("fs")
const login = require("facebook-chat-api")


login({ email: "", password: "" }, (err, api) => {
    if (err) return console.error(err)
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState())) // Đăng nhập lưu cookie
})