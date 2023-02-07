# CSC325 Team 8 Development
 Development repo for Team 8

 Code started from: https://github.com/AndrewJager/CSC325-Team-8-Snapshot-1


## Setup
To run this bot, you must create a config.json file (in the same directory as index.js) with the following structure:

```
{
    "token" : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "clientId" : "1111111111111111111111",
    "guildId" :"222222222222222222222"
}
```

Replace the values with your token, clientId(ID of the bot), and guildId(ID of the server)

You also must have Discord.js and Node.js installed. 
Tutorial here: https://discordjs.guide/preparations/#installing-node-js

## Commands
**Current commands:**

`/welcome` - Creates a message to welcome new members to the server and specify the rules of the server.

`/courses` - Generates a message with the chosen roles. Users can click the buttons on the message to get roles assigned to them.

`/newclass` - Creates a class, taking the department, course number, and semester as parameters. When this command is ran, a new group of channels is created in the server, with the parameters from the `/newclass` command used to name the channels.

## Starter Code
The starter code for this bot was from [Chase C's tutorial bot](https://github.com/Meapers0/Tutorial-bot).
