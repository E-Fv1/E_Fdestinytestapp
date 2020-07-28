const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const fs = require("fs")

//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const app = express()
var tempLoginURL = ""
var userList;
//app.get("/", function (req, res) {
//    res.send("Hello World")
//})

//var baseRequest = requst.defaults({ headers: { "X-API-KEY": d17b4947cf3e43369fe5bb66c59d5b3d}})

const apiKey = "d17b4947cf3e43369fe5bb66c59d5b3d"

function randomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}

app.listen(process.env.PORT || 8000, function () {
    console.log("Example app on port 8000")
})
var port = process.env.PORT || 8000;
console.log("Node is listening on port " + port)

app.use("/", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

var options = {
    'method': 'GET',
    'url': 'https://www.bungie.net/Platform/Destiny2/3/ItsTheOzze/Account/', // need too put in rest of info
    'headers': {
        'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
        'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1adlRgw@@qYj'
    }
};
//request(options, function (error, response) {
//    if (error) throw new Error(error);
//    console.log("this is the thingy" + response.body);
//});
var testVar

app.get("/css/style.css", function (req, res) {
    res.sendFile(__dirname + "/html/css/style.css") //p dumb probably not how to actually do it
    //console.log(
})

//var testVar2 = testVar
console.log(testVar)
//console.log(testVar2)
app.get("/bruh", function (req, res) {
    options.url = "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/dattowatto/"
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.set("Content-type", "text/html")
        res.send(response.body+"<script>console.log(window.location.href)</script>");
        //res.send(options)
    });
    //res.send(result+"AAAAAAAAAAAAAAAAAAAAA  ")
    //console.log(window.location.href)

})

var result

app.get("/lookupName", function (req, res) {
    let nameToSearch = req.query.bungieName //"ItsTheOzze"
    

    options = {
        'method': 'GET',
        'url': 'https://www.bungie.net/Platform//User/SearchUsers?q=' + nameToSearch,
        'headers': {
            'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
            'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1aNlRgw@@FCG'
        }
    };

    //options.url = "https://www.bungie.net/Platform/User/SearchUsers?q=" + nameToSearch
    
    var steamName
    //var bungieProfileResults =
        request(options, function (error, response) {
        
        if (error) throw new Error(error);
        //console.log(response.body);
        result = JSON.parse(response.body)

        if (typeof result == "undefined") {
            result = "Doesn't exist or is non-steam"
        }
        steamName = result.Response[0].membershipId
        result = "Steam Name: " + result.Response[0].steamDisplayName + ", Membership ID: " + result.Response[0].membershipId
        return result

    })

    //result = result.split(": ")
    //console.log(bungieProfileResults)
    console.log(result)
    //var steamName = result.Response[0].membershipId

    var options = {
        'method': 'GET',
        'url': 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/' + steamName,
        'headers': {
            'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
            'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1TdlRgw@@zND'
        }
    };

    var destinyMembershipID = "4611686018475731060"
    request(options, function (error, response) {
        if (error) throw new Error(error);
        if (response.body) {
            destinyMembershipID = response.body
        } else {
            //maybe add mine as default
        }
    });

    //console output
    console.log(result + "Destiny Membership ID: " + destinyMembershipID)

    //page output
    res.set("Content-type", "text/html")
    res.send("<p>" + result + "<br><br>Destiny Membership ID: " + destinyMembershipID + "</p>" +"<hr><br><p>If first result is undefined reload page<\p>")
    
})
        //res.json(result.Response[0].steamDisplayName)

    


    //app.post("/lookupName", function (req, res) {
    //    let nameToSearch = "ItsTheOzze" //req.query.body.bungieName
    //    options = {
    //        'method': 'GET',
    //        'url': 'https://www.bungie.net/Platform//User/SearchUsers?q=' + nameToSearch,
    //        'headers': {
    //            'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
    //            'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1aNlRgw@@FCG'
    //        }
    //    };
    //    request(options, function (error, response) {
    //        if (error) throw new Error(error);
    //        res.json(response.body);
    //    });

    //})
//})


//app.get("/lookupName", function (req, res) {
//    res.send("Test")
//})

app.get("/loginTest", function (req, res) {
    var options = {
        'method': 'GET',
        'url': 'https://www.bungie.net/en/oauth/authorize?client_id=33391&response_type=code&state=teY7eHQIdo',
        'headers': {
            'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
            'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1HNhRgw@@lWt; bungles=WebView=False&UserFlowMode=SignIn&UserICT=None&UserSCT=None&UserForce=False&UserIDN='
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
        
    });
})

app.get("/en/User/SignIn/SteamId", function (req, res) {
    res.set("Content-type", "text/html")
    res.send("<!DOCTYPE html><html lang=\"en\"><head><title>YAYYY</title></head><body><a id=\"theLink\" href=\"https://www.bungie.net/\">CLICKMETHANKS</a><script>var bruh=window.location.href;bruh=bruh.split(\"\");bruh.splice(0,\"https://destiny2test-e-f.herokuapp.com\".length);bruh=bruh.join(\"\");document.getElementById(\"theLink\").href=\"https://www.bungie.net/\"+bruh;</script></body></html>")
});

app.get("/receive", function (req, res) {
    code = req.query.code
    console.log(code)

    res.set("Content-type", "text/html")
    res.send("<body><script>window.location.replace(\"https://destiny2test-e-f.herokuapp.com/storeData?authCode="+ code +"&id=7777777\")</script></body>")

    var options = {
        'method': 'POST',
        'url': 'https://www.bungie.net/Platform/App/OAuth/Token/',
        'headers': {
            'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1S9hRgw@@ChX'
        },
        body: "client_id=33391&grant_type=authorization_code&code=" + code

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

})

app.get("/storeData", function (req, res) {
    let authCode = req.query.authCode
    let userID = req.query.id

    let rawUserData = fs.readFileSync("userinfo.json")
    let parsedData = JSON.parse(rawUserData)
    //if (typeof parsedData.users[userID] == undefined){
        parsedData.users.push([authCode, userID])
    //}
    //maybe use req.ip to assign the user a unique index # random 
    let idIndex = parsedData.users.length - 1
    console.log(parsedData.users[idIndex][0])//.users[userID] = "authcode"
    //console.log(userID)
    //res.send(parsedData)
    let data = JSON.stringify(parsedData, null, 2);
    fs.writeFileSync("userinfo.json", data)
    res.set("Content-type", "text/html")
    res.send("<body><script>alert(\"Session ID: " + idIndex + " " + authCode +"\");window.location.replace(\"https://destiny2test-e-f.herokuapp.com/\")</script></body>")

});