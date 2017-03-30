import { Chatting } from './chatting';

export class Connect {

    constructor(private botClient: any, private twitchOptions: any){ };

    Connect() {
      this.botClient.connect().then( (data) => {
        // data returns [server, port]
        // Connected with success, start the listeners.
        console.log("Connected to Twitch");
        this.userListener();
        this.hostListener();
        this.chatListener();
      }).catch( (err) => {
        console.log("could not connect to twitch irc");
      });

      this.botClient.on('connected', (address, port) => {
        console.log("bot is connected to: " + this.twitchOptions.channels[0]);
        this.botClient.action(this.twitchOptions.channels[0], "Hello, i'm a bot!");
      });
    }

    userListener() {
      console.log("User listeners added");
      this.botClient.on("join", (channel, username, self) => {
          console.log(username + " entered the stream.");
      });
      this.botClient.on("part", (channel, username, self) => {
          console.log(username + " left the stream.");
      });
    }

    hostListener() {
      console.log("Host listeners added");
      this.botClient.on("hosted", (channel, username, self) => {
        console.log(username + " hosted our stream.");
      });
    }

    chatListener() {
      console.log("Chat listeners added");
      this.botClient.on("chat", (channel, userData, message, self) => {
        let chat = new Chatting(this.botClient, this.twitchOptions);
        chat.parseText(userData, message);
      });
    }

}
