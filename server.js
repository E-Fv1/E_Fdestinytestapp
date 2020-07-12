const express = require("express")
const request = require("request")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const app = express()
//app.get("/", function (req, res) {
//    res.send("Hello World")
//})

//var baseRequest = requst.defaults({ headers: { "X-API-KEY": d17b4947cf3e43369fe5bb66c59d5b3d}})

const apiKey = "d17b4947cf3e43369fe5bb66c59d5b3d"

app.listen(process.env.PORT || 8000, function () {
    console.log("Example app on port 8000")
})
var port = process.env.PORT || 8000;
console.log("Node is listening on port " + port)

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/index.html")
})

var options = {
    'method': 'GET',
    'url': 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/dattowatto/',
    'headers': {
        'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
        'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1adlRgw@@qYj'
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("this is the thingy" + response.body);
});
var testVar

//var testVar2 = testVar
console.log(testVar)
//console.log(testVar2)
app.get("/bruh", function (req, res) {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
    //res.send(result+"AAAAAAAAAAAAAAAAAAAAA  ")
})
