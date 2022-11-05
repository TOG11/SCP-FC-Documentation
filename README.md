# SCP-FC-Documentation Version Pre-Alpha 0.0.0.72
Documentation for SCP: Facilitys Server Configuration and LDS commands.


# Server Configuration Help
```
---
# DO NOT CHANGE THIS VERSION
version: "0.0.0.PA72_Multiplayer-Test" --- This is used to tell the server what config file version this is, changing it can result in multipule fatal errors.
##########
server-name: "Another SCP: Facility Server" --- This is the server name, showed on the server list, and in-game in the exit menu.
description-file: C:\Users\YOUR USER HERE\Documents\.SCPFACILITY\DESCRIPTION TXT HERE --- This is the dexcirption file path, it is used to find and read your description file.

server-port: 8644 --- This is the server port, used to host the server on, please note that the default port is 8644, this can be changed.
server-list-key: null --- Only fill this in if you have a server list API key for your server. Contact me for one. aidendes@mail.scpfacility.com
server-list-address: "server.yourwebsite.com" --- Only fill this in if you have a server list API key, otherwise leave it, it is used to connect to the server from the server list.

max-players: 50 --- This is the servers max number of concurrent players, although this can reach over 50 from aprox pings to the server, which connects a user to the server without any player, and gets an aproximate ping over 5 seconds, then the client will leave that server. this process WILL NOT effect the player count, and can only be done every 15 seconds from the server list.

server-logo-url: https://i.ibb.co/NsWQFwB/1Norm.png # defaults to the SCP:FC logo --- This is the server list logo, showed on the server list.

# COMING SOON: 

framework-api: "Network" # network will bring the framework to an HTTPS POST & GET API, with authentication. "Local" will be a local framework that will import any plugin.cs files to the server from the ./plugins folder in the main server directory.
# framework-api-network-port: 8641 #port for the HTTPS Framework to run on, if the above is set to Network.
# lds-mode: local --- choose between "local" or "network", network will allow you to run commands on the server over a POST API and the server console, local will allow for local commands to be ran from just the console. (note: you can also run commands from the framework API!)
# lds-port: 8647 --- if "netowrk" is selected for LDS mode, then this is the port for the POST API to run on.

##COMING SOON END

tag-sort: foreach #foreach OR array - read docs for more info on both options.
player-tags: --- This is the servers tags
    ######################
  -  --- this single dash (-) must ALWAYS be one tab-space away from the left edge of the file!!!
    steam64: "Steam64 Dec Here" --- users steam 64 id
    tag-hex-color: "#33FF74" --- a color of choice in hexadecimal
    tag-name: "Owner" --- tags public name
    tag-permissions: 0 --- tag permmisions (any user who has this tag will have these permissions) only goes from 0 - 10, 0 being none, 10 being full control over DSC.
    ######################
    --- Some Examples ---
  - 
    steam64: "Steam64 Dec Here"
    tag-hex-color: "#3374FF"
    tag-name: "Moderator"
    tag-permissions: 10
  - 
    steam64: "Steam64 Dec Here"
    tag-hex-color: "color in HEX"
    tag-name: "tag name"
    tag-permissions: 0
```

# LDS Commands
LDS stands for Local Dedicated Server. <br>

LDS is basically the servers console input field, where you can input a wide range of commands locally, or by the framework API, OR over a POST API if you so choose.<br>

Current LDS commands:
```c-reload``` --- reloads the config, optional arguments: "--no-refresh" - this will not refresh the server information on clients, by default it does<br><br>
```sc-refresh``` --- refreshes the information from the servers cached config on all clients (called by "c-reload" automatically)<br><br>
```sc-disconnect SteamIDHere``` --- will disconnect a player from the server, optional arguments: "--all" -disconnects all users (provide a steam id of 0)<br><br>
```s-graceful-restart``` --- will gracefully disconnect all clients and restart the server on the servers next frame, allowing a reason for the restart to be sent to all clients. (option arguments: "s-graceful-restart Restart Note Here..." ) <br><br>
```s-restart``` --- this will immidiatly restart the server, clients may not be notified properly as it could be before the next frame of the server, therefore the client could have an error for the disconnect, saying the server was fataly shutdown.<br><br>
```s-stop``` --- this will immidiatly stop the server, clients will be notified of the shutdown.<br><br>

More To Come Soon!
