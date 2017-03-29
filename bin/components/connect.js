var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Connect = (function (_super) {
    __extends(Connect, _super);
    function Connect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Connect.prototype.connnectBot = function () {
        this.botClient.connect().then(function (data) {
            // data returns [server, port]
            // Connected with success, start the listeners.
            this.userListener();
            this.hostListener();
        }).catch(function (err) {
            console.log("could not connect to twitch irc");
        });
        this.botClient.on('connected', function (address, port) {
            console.log("bot is connected to: " + this.tmiOptions.channels[0]);
            this.botClient.action(this.tmiOptions.channels[0], "Hello, i'm a bot!");
        });
    };
    Connect.prototype.userListener = function () {
        this.botClient.on("join", function (channel, username, self) {
            console.log(username + " entered the stream.");
        });
        this.botClient.on("part", function (channel, username, self) {
            console.log(username + " left the stream.");
        });
    };
    Connect.prototype.hostListener = function () {
        this.botClient.on("hosted", function (channel, username, self) {
            console.log(username + " hosted our stream.");
        });
    };
    Connect.prototype.chatListener = function () {
        this.botClient.on("chat", function (channel, username, message, self) {
            console.log(username + " said: " + message);
            this.Chatting.parseText(username, message);
        });
    };
    return Connect;
}(TwitchBot));
