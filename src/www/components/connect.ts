import { Chatting } from './chatting';

var socketIO = require("socket.io");

export class Connect {

    //private io: any;

    constructor(private botClient: any, private twitchOptions: any, private tb: any){ }

    Connect() {
      this.botClient.connect().then( (data) => {
        // data returns [server, port]
        // Connected with success, start the listeners.
        console.log("Connected to Twitch");
        this.tb.getSocket().sockets.emit('message', 'Connected to Twitch', 'event');
        this.userListener();
        this.hostListener();
        this.chatListener();
      }).catch( (err) => {
        console.log("Could not connect to Twitch irc");
      });

      this.botClient.on('connected', (address, port) => {
        console.log("Bot is connected to: " + this.twitchOptions.channels[0]);
        this.tb.getSocket().sockets.emit('message', "Bot is connected to: " + this.twitchOptions.channels[0], 'event');
        this.botClient.action(this.twitchOptions.channels[0], "Hello, i'm a bot!");
      });
    }

    userListener() {
      console.log("User listeners added");
      this.botClient.on("join", (channel, username, self) => {
          this.tb.getSocket().sockets.emit('message', username + " entered the stream.", 'event');
          console.log(username + " entered the stream.");
      });
      this.botClient.on("part", (channel, username, self) => {
          this.tb.getSocket().sockets.emit('message', username + " left the stream.", 'event');
          console.log(username + " left the stream.");
      });
    }

    hostListener() {
      console.log("Host listeners added");
      this.botClient.on("hosted", (channel, username, self) => {
        this.tb.getSocket().sockets.emit('message', username + " hosted our stream.", 'event');
        console.log(username + " hosted our stream.");
      });
    }

    chatListener() {
      console.log("Chat listeners added");
      this.botClient.on("chat", (channel, userData, message, self) => {
        let chat = new Chatting(this.botClient, this.twitchOptions);
        chat = chat.parseText(userData, message);
        if(chat) {
          this.tb.getSocket().sockets.emit('message', chat, 'chat');
        }
      });
    }

}
