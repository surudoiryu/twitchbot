# twitchbot
A Twitchbot checking your twitch channel

How to set it up:
* Clone from git to a directory
* install nodejs

Create a twitch account for your bot here: https://www.twitch.tv/ and log in  
Get your bot token here: http://twitchapps.com/tmi/  

Make sure you also got a personal account, where the bot can connect to.  

Duplicate the .env_sample file and rename it too: .env  
Insert the values in the .env file

```
$ npm install
$ gulp
-- Open your personal twitch channel --
$ npm start
```

Twitch API: https://docs.tmijs.org/v1.1.1/Commands.html
