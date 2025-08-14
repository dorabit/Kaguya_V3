export default {
    name: "welcome",
    description: "ترحيب بالعضو الجديد",
    execute: async (bot, message, args) => {
        const user = message.sender;
        const welcomeMsg = `مرحباً بك ${user.name} في البوت 🌸\nأتمنى لك وقت ممتع!`;
        await bot.sendMessage(message.threadID, welcomeMsg);
    }
};
