# twitchbot
A Twitchbot checking your twitch channel

## How to start:
* Clone the project `git clone https://github.com/surudoiryu/twitchbot.git`
* Have NodeJS installed: https://nodejs.org
* Create a Twitch account for your bot: https://www.twitch.tv
* Copy .env_sample to .env

## Update .env file
Update the data in your .env file by opening it with a text editor.
TWITCH_JOINCHANNEL : fill in the channel you want the bot to join.
TWITCH_USERNAME : fill in the username the bot has.
TWITCH_OATHKEY : fill in the Oath key from Twitch.

## How to get the Oauth key
Log in at twitch: https://www.twitch.tv/ with your bot's account,
after logging in you can get the token here: http://twitchapps.com/tmi/  

## Starting the bot
Open the Twitch channel your bot will join as stated in *TWITCH_JOINCHANNEL*
Open commandline, powershell, terminal, git bash, etc. etc.
And enter the following commands to get the bot started:
```
npm install
gulp
npm start
```
When all is succesfully executed, you will see at the Twitch channel
that the bot says: `Hello, i'm a bot!` in the chat.

## What now ?
Well.. start programming! This is bot will be expanded with commands over time,
but whenever you have something you like to add, just fork the project and make
a merge-request.
Lets build an awesome Twitch bot!

## Current public commands
```
!twitter  <shows twitter link>
hi || hello <greets the user>
```

## Current mod commands
```
slap <slaps the user>
```

## Commands comming in the feature
```
!facebook
!linkedin
!instagram
!website
!blog

!coins
!addcoins <username>
!removecoins <username>

!poll
!poll vote {a,b,c,d}

!raffle
!raffle {coins}

!mods
!setMOTD
```

## Features
This list is what will come in the future
* Local web environment, where you can set settings and see everything (for sure)
* Talk with the bot, will have an AI which costs {coins} to ask things (maybe)
* Mini games
* Self made commands, with strings how the bot should react.

Twitch API: https://docs.tmijs.org/v1.1.1/Commands.html
