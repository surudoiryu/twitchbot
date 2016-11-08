class Chatting extends TwitchBot
{
    //user['display-name']
    parseText(userName:string, chatText:string){
        if(chatText == "slap" && this.isUserMod(userName) ){
            this.command_slap(userName);
        }
        if(chatText == "!twitter"){
            var platform:string = "twitter";
            this.command_socialmedia(platform);
        }
        if(chatText == "hi" || chatText == "hello" ){
            this.command_greet(userName);
        }
    }
    isUserMod(userName:string): boolean{
        return this.botClient.isMod( this.tmiOptions.channels[0], userName);
    }


    command_slap(userName:string){
        this.botClient.action(this.tmiOptions.channels[0], "SLAP, "+userName+"!");
    }

    command_socialmedia(platform:string){
        if(platform == "twitter"){
            this.botClient.action(this.tmiOptions.channels[0], "twitter.com/mytwitter");
        }
    }

    command_greet(userName:string){
        this.botClient.action(this.tmiOptions.channels[0], "Hello there, "+userName+"!");
    }
    
}