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
var Chatting = (function (_super) {
    __extends(Chatting, _super);
    function Chatting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //user['display-name']
    Chatting.prototype.parseText = function (userName, chatText) {
        if (chatText == "slap" && this.isUserMod(userName)) {
            this.command_slap(userName);
        }
        if (chatText == "!twitter") {
            var platform = "twitter";
            this.command_socialmedia(platform);
        }
        if (chatText == "hi" || chatText == "hello") {
            this.command_greet(userName);
        }
    };
    Chatting.prototype.isUserMod = function (userName) {
        return this.botClient.isMod(this.tmiOptions.channels[0], userName);
    };
    Chatting.prototype.command_slap = function (userName) {
        this.botClient.action(this.tmiOptions.channels[0], "SLAP, " + userName + "!");
    };
    Chatting.prototype.command_socialmedia = function (platform) {
        if (platform == "twitter") {
            this.botClient.action(this.tmiOptions.channels[0], "twitter.com/mytwitter");
        }
    };
    Chatting.prototype.command_greet = function (userName) {
        this.botClient.action(this.tmiOptions.channels[0], "Hello there, " + userName + "!");
    };
    return Chatting;
}(TwitchBot));
