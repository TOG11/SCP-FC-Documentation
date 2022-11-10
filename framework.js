const fs = require('fs');
const child = require("child_process");
console.log(`Framework Awake!`)

if (!fs.existsSync("./node_modules/js-yaml")) {
    console.log(`WARN: Missing NPM Packages, installing all packages now... (this could take awhile!)`)
    child.exec('npm install"', function (error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
        main();
    });
} else {
    console.log(`Starting Express Server...`)
    main();
}

function main() {
    const RequestIp = require('@supercharge/request-ip');
    const express = require('express');
    const yaml = require('js-yaml');
    Config = yaml.load(fs.readFileSync("../config/framework.yaml", { encoding: "utf-8" }));
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const port = Config.port;

    app.get('/server', (req, res) => {
        console.log(`Framework Request! ` + RequestIp.getClientIp(req))
        var locConfig = yaml.load(fs.readFileSync("../config/framework.yaml", { encoding: "utf-8" }));
        if (!req.query.type) {
            console.log(`Framework Request Failed ` + RequestIp.getClientIp(req)+" No type query was passed.")
            return res.send(`{"code": "404", "reason": "No '?type=' query was passed to the framework, you must specify a request type."}`);
        }

        if (req.query.type == "get") {

        if (req.query.req && locConfig.AuthorizedIPAddresses.includes(RequestIp.getClientIp(req)) || RequestIp.getClientIp(req) == "::1" || RequestIp.getClientIp(req) == "::ffff:192.168.0.50") {
            if (!req.query.req) {
                console.log(`Framework Request Failed ` + RequestIp.getClientIp(req)+" No request type query was passed.")
                return res.send(`{"code": "404", "reason": "No '?req=' query was passed to the framework, and you specified a GET request."}`);
            }
            
            console.log(`Framework Request! ` + RequestIp.getClientIp(req) + ` Requesting GET With Signed IP`)
            if (req.query.req == "info") {
                console.log(`Framework Request! ` + RequestIp.getClientIp(req) + " Requested ?info  With Signed IP")
                return res.json(`{
                    "serverTicks": "${locConfig.ticks}",
                    "port": "${locConfig.port}",
                    "status": "${locConfig.status}",
                    "players": "${locConfig.players}",
                    "onList": "${locConfig.onList}",
                    "name": "${locConfig.name}",
                    "desc": "${locConfig.desc}",
                    "hoster": "${locConfig.hoster}",
                    "round": "${locConfig.round}"
                }`);
            } else if (req.query.req == "playercount") {
                console.log(`Framework Request! ` + RequestIp.getClientIp(req) + " Requested ?playercount  With Signed IP")
                return res.send(locConfig.players);
            } else if (req.query.req == "players") {
                console.log(`Framework Request! ` + RequestIp.getClientIp(req) + " Requested ?players  With Signed IP")
                return res.send(locConfig.playersSteam);
            }
        } else {
            console.log(`Framework Request! ` + RequestIp.getClientIp(req) + " Failed! Not A Server-Signed IP!")
            return res.send(`{"code": "401", "The IP You are requesting to access this framework from is not signed on by the server, you are unauthorized."}`);
        }
    } else {
        //POST, PUT, ETC
        return;
    }
    })

    app.listen(port, () => {
        console.log(`Express Server Started on port ${port}`)
    })
}