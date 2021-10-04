const express = require("express")
const request = require("request")
//const sqlite3 = require("sqlite3").verbose(); // may need in future doesnt work in heroku???
const bodyParser = require("body-parser")
const fs = require("fs")

//IN PROGRSS: In Nightfall info, need to make accented letters not appear as question marks
//
//TODO: Do a todayindestiny style altars of sorrow weapon indicator DONE
//      integrate the rss feed for d2 news http://www.bungie.net/News/NewsRss.ashx
//
//     
//
//NOTE TO SELF: When extracting data from a request function assign it to only the relevant data or else it may become undefined

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

function parseDate(rawDate) {
    let result
    //dateParserRegex = new RegExp("", + gi) split the string instead
    //result.split(" ") ok no need for split
    let day = rawDate.getDate()
    let month = rawDate.getMonth() + 1 //since is 0-11 need to offset by 1
    result = month + "/" + day
    return result // formatted like 7/27
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
        res.send(response.body + "<script>console.log(window.location.href)</script>");
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

    var destinyMembershipID //= "4611686018475731060"
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
    res.send("<p>" + result + "<br><br>Destiny Membership ID: " + destinyMembershipID + "</p>" + "<hr><br><p>If first result is undefined reload page<\p>")
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
    res.send("<body><script>window.location.replace(\"https://destiny2test-e-f.herokuapp.com/storeData?authCode=" + code + "&id=7777777\")</script></body>")

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

//function requestSomething(theOptions) {
//    let result
//    request(theOptions, function (error, response) {
//        if (error) throw new Error(error);
//        result = response.body;
//    });
//    return result
//} // dont use me pls

var currentNightfall
app.get("/nightfall", function (req, res) {
    //var currentNightfall
    let options = {
        'method': 'GET',
        'url': 'https://www.bungie.net/Platform/Destiny2/Milestones/',
        'headers': {
            'X-API-KEY': 'd17b4947cf3e43369fe5bb66c59d5b3d',
            'Cookie': '__cfduid=dc09cea3d95edeeaf57be20068d3061121594429651; bungled=3003931655291159902; bungledid=B1gxoP3JMYtLnXFMi9gavaHgIQrLNiXYCAAA; bungleanon=AwAAAACtAAAAAAAAAE8lVwEAAAAAAAAAAAAAAABDSc09fzbYCEAAAABA5DUVqx/xTvVGePJHSTYUNmTiL7/zWH35DghiUsvPoI/VoG0YH+gY6qGVUT84+ZRb0ZqhIKZkWq9vIHLlJW41; Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjW=v1aNlRgw@@FCG'
        }
    };

    //let currentNightfall // = "Do not know" uh idk
    var nightfallObj
    request(options, function (error, response) {
        if (error) throw new Error(error);
        //res.send(typeof response.body);
        let result = JSON.parse(response.body)
        currentNightfall = response.body
        if (currentNightfall == "undefined") {
            currentNightfall = "bruh"
        }
        currentNightfall = result.Response["1942283261"].activities;
        //res.send(typeof nightfallObj)
        //return currentNightfall
    });

    //console.log(currentNightfall)
    //nightfallObj = JSON.parse(currentNightfall)
    //res.send(typeof nightfallObj)
    //res.send(typeof currentNightfall)
    //Master refers to the difficulty level, not a master list of strikes or whatever

    let rawActivityInfo = fs.readFileSync("strikeList.json")
    let rawModifierInfo = fs.readFileSync("strikeModifiers.json")

    rawActivityInfo = JSON.parse(rawActivityInfo)
    rawModifierInfo = JSON.parse(rawModifierInfo)

    let nightfallName = currentNightfall[8]["activityHash"] // Index 3 is the 1080 Master Level Nightfall
    let masterNFModifierHashes = currentNightfall[8]["modifierHashes"]
    //console.log(masterNFModifierHashes)

    let masterNFModifierNames = []; // The first thingy in i index in the array is the name then description

    for (let i = 0; i < masterNFModifierHashes.length; i++) {
        masterNFModifierNames.push([])
        //console.log("Number One " + masterNFModifierNames)
        masterNFModifierNames[i].push(rawModifierInfo[masterNFModifierHashes[i]]["displayProperties"]["name"])
        //console.log("Number Two " + masterNFModifierNames)
        masterNFModifierNames[i].push(rawModifierInfo[masterNFModifierHashes[i]]["displayProperties"]["description"])
    }

    //console.log("Number Three " +masterNFModifierNames)
    nightfallName = rawActivityInfo[nightfallName].displayProperties.description

    res.set("Content-type", "text/html")
    let sentData = "<html lang=\"en\"><head><link href=\"https://fonts.googleapis.com/css2?family=Roboto&family=Source+Sans+Pro&display=swap\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://use.typekit.net/keg2rfp.css\"><link rel=\"stylesheet\" href=\"/style.css\" /><meta charset=\"utf-8\"/><title>Current Nightfall</title></head><body><h1>What is the current Nightfall?</h1><br /><h3>" + nightfallName + "</h3><h4>Modifiers</h4><ul><li>" + rawModifierInfo[masterNFModifierHashes[0]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[0]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[1]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[1]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[2]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[2]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[3]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[3]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[4]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[4]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[5]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[5]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[6]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[6]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[7]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[7]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[8]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[8]]["displayProperties"]["description"] + "</li><li>" + rawModifierInfo[masterNFModifierHashes[9]]["displayProperties"]["name"] + ": " + rawModifierInfo[masterNFModifierHashes[9]]["displayProperties"]["description"] + "</li></ul></body></html>"
    res.send(sentData)
    //res.send(masterNFModifierNames)
});

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
    res.send("<body><script>alert(\"Session ID: " + idIndex + " " + authCode + "\");window.location.replace(\"https://destiny2test-e-f.herokuapp.com/\")</script></body>")
});

app.get("/images", function(req, res) {
    let userID = req.headers['x-forwarded-for'];
    console.log(userID);
    res.sendFile(__dirname + "/public/images/i-have-your-ip-address-garfield.gif");
});