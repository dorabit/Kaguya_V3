import weather from "weather-js";

export default {
    name: "weather",
    description: "عرض الطقس في مدينتك",
    execute: async (bot, message, args) => {
        const city = args.join(" ");
        if (!city) return bot.sendMessage(message.threadID, "يرجى كتابة اسم المدينة.");

        weather.find({ search: city, degreeType: "C" }, function(err, result) {
            if (err || !result || !result[0]) return bot.sendMessage(message.threadID, "لم أتمكن من العثور على المدينة.");
            const forecast = result[0].current;
            const msg = `المدينة: ${forecast.location.name}\nدرجة الحرارة: ${forecast.temperature}°C\nحالة السماء: ${forecast.skytext}`;
            bot.sendMessage(message.threadID, msg);
        });
    }
};
