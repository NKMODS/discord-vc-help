const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = 'MTI4NTk5MDQ4NjE3NTI1MjcyMA.GBNsdH.OyVYfZxHhrFNzuzoRbrXO-_lWT79_NRLc-XdSs';
const TARGET_VC_ID = '1381316695599087626';
const ALERT_CHANNEL_ID = '1381320314402766909';

const ROLE_IDS_TO_MENTION = [
  '1033761284266672259',
  '1033944462092669049',
  '1344910489808797748'
];

client.on('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.channelId !== newState.channelId && newState.channelId === TARGET_VC_ID) {
    const user = newState.member.user;
    const alertChannel = client.channels.cache.get(ALERT_CHANNEL_ID);

    if (alertChannel) {
      const userMention = `<@${user.id}>`;

      const roleMentions = ROLE_IDS_TO_MENTION.map(id => `<@&${id}>`).join(' ');

      const message = `🔔 **${userMention}** joined the help VC! 
${roleMentions}
-----------------------------------------`;

      alertChannel.send(message);
    }
  }
});

client.login(TOKEN);
