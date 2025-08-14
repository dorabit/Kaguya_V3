import fs from "fs-extra";

const dataFile = "./database/points.json";

export default {
    name: "points",
    description: "عرض النقاط والمستوى",
    execute: async (bot, message, args) => {
        const userID = message.senderID;
        let data = {};
        if (fs.existsSync(dataFile)) {
            data = await fs.readJson(dataFile);
        }
        if (!data[userID]) {
            data[userID] = { points: 0, level: 1 };
        }

        const userData = data[userID];
        const msg = `نقاطك: ${userData.points}\nمستواك: ${userData.level}`;
        await bot.sendMessage(message.threadID, msg);

        // إضافة نقطة لكل استخدام للأمر
        userData.points += 1;
        if (userData.points >= userData.level * 10) {
            userData.level += 1;
            await bot.sendMessage(message.threadID, `مبروك! لقد ارتقيت للمستوى ${userData.level} 🎉`);
        }

        await fs.writeJson(dataFile, data);
    }
};
