import { Settings } from './settings';

export class Chatting
{
    private socialLinks: any = new Settings().socialLinks();

    constructor(private botClient: any, private twitchOptions: any){ };

    //user['display-name']
    parseText(userData:any, chatText:string): any {
      let userName = userData.username;
      var chatTextLowered = chatText.toLowerCase();

      //Check first if the string has multiple arguments and if has more then 4 words? then skip commands

      if(chatTextLowered == "slap" && this.isUserMod(userData) ){
        this.command_slap(userName);
      }
      else if(["!twitter","!facebook","!instagram","!snapchat","!discord","linkedin"].indexOf(chatText) != -1){
        var platform:string = chatTextLowered.substr(1);
        this.command_socialmedia(platform);
      }
      else if(["hi","hello"].indexOf(chatTextLowered) != -1  ){
        this.command_greet(userName);
      }
      else {
        this.defaultChatMessage(userData, chatText);
        return "<strong style='color: "+userData.color+"'>&lt;"+userName+"&gt;: </strong>" + chatText;
      }
      return null;
    }

    isUserMod(userData:any): boolean {
        return userData.mod;
    }

    command_slap(userName:string){
        this.botClient.action(this.twitchOptions.channels[0], "SLAP, "+userName+"!");
    }

    command_socialmedia(platform:string){
      if(!!this.socialLinks[platform]) {
        this.botClient.action(this.twitchOptions.channels[0], this.socialLinks[platform]);
      }
    }

    command_greet(userName:string){
        this.botClient.action(this.twitchOptions.channels[0], "Hello there, "+userName+"!");
    }

    defaultChatMessage(userData: any, chatText: string) {
      console.log("<" + userData.username + "> said: " + chatText);
    }
}
