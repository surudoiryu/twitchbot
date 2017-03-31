var dotenv = require("dotenv").config();

export class Settings {

  private options = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
      username: ((process.env.TWITCH_USERNAME) ? process.env.TWITCH_USERNAME : "mybot"), // Twitchname of your bot (create a profile)
      password: ((process.env.TWITCH_OATHKEY) ? process.env.TWITCH_OATHKEY : "myoathkey") // Get your Token here: http://twitchapps.com/tmi/
    },
    channels: [ "#" + ((process.env.TWITCH_JOINCHANNEL) ? process.env.TWITCH_JOINCHANNEL : "surudoiryu") ]
  }

  private social = {
    facebook: ((process.env.SOCIAL_FACEBOOK) ? process.env.SOCIAL_FACEBOOK : null),
    twitter: ((process.env.SOCIAL_TWITTER) ? process.env.SOCIAL_TWITTER : null),
    instagram: ((process.env.SOCIAL_INSTAGRAM) ? process.env.SOCIAL_INSTAGRAM : null),
    linkedin: ((process.env.SOCIAL_LINKEDIN) ? process.env.SOCIAL_LINKEDIN : null),
    snapchat: ((process.env.SOCIAL_SNAPCHAT) ? process.env.SOCIAL_SNAPCHAT : null),
    discord: ((process.env.SOCIAL_DISCORD) ? process.env.SOCIAL_DISCORD : null)
  }

  constructor(){ }

  tmiOptions() {
    return this.options;
  }

  socialLinks() {
    return this.social;
  }

}
