export default {
    name: "fun",
    description: "أوامر ترفيهية",
    execute: async (bot, message, args) => {
        const command = args[0];
        switch(command) {
            case "kiss":
                await bot.sendMessage(message.threadID, "💋 ها هي قبلة لك!");
                break;
            case "hug":
                await bot.sendMessage(message.threadID, "🤗 حضنك مليء بالحب!");
                break;
            case "joke":
                await bot.sendMessage(message.threadID, "😂 نكتة اليوم: لماذا الكمبيوتر لا يغرق؟ لأنه يحتوي على برنامج مضاد للغرق!");
                break;
            default:
                await bot.sendMessage(message.threadID, "استخدم: fun kiss | fun hug | fun joke");
        }
    }
};
