class Connect extends TwitchBot
{
    connnectBot(){
        this.botClient.connect().then(function(data) {
            // data returns [server, port]
            // Connected with success, start the listeners.
            this.userListener();
            this.hostListener();
        }).catch(function(err) {
            console.log("could not connect to twitch irc");
        });

        this.botClient.on('connected', function(address, port){ 
            console.log("bot is connected to: "+this.tmiOptions.channels[0]);
            this.botClient.action(this.tmiOptions.channels[0], "Hello, i'm a bot!");
        });
    }
    userListener(){
        this.botClient.on("join", function (channel, username, self) {
            console.log(username+" entered the stream.");
        });
        this.botClient.on("part", function (channel, username, self) {
            console.log(username+" left the stream.");
        });
    }
    hostListener(){
        this.botClient.on("hosted", function (channel, username, self) {
            console.log(username+" hosted our stream.");
        });
    }
    chatListener(){
        this.botClient.on("chat", function(channel, username, message, self){
            console.log(username+" said: "+message);
            this.Chatting.parseText(username, message);
        });
    }
}