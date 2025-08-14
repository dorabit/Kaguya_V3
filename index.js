// index.js
import fs from "fs";
import { createBot } from "@duyhau/fca-unofficial"; // المكتبة الرئيسية
import config from "./config.js";

// إنشاء البوت
const bot = await createBot({
    email: "your_email_here",
    password: "your_password_here"
});

// تحميل جميع الأوامر من مجلد commands
const commands = {};
fs.readdirSync("./commands").forEach(file => {
    if (file.endsWith(".js")) {
        import(`./commands/${file}`).then(module => {
            const cmd = module.default;
            commands[cmd.name] = cmd;
            console.log(`✅ تم تحميل الأمر: ${cmd.name}`);
        });
    }
});

// استقبال الرسائل
bot.listenMqtt(async (message) => {
    if (!message.body) return;

    const prefix = config.prefix || "*";
    if (!message.body.startsWith(prefix)) return;

    const args = message.body.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    if (commands[cmdName]) {
        try {
            await commands[cmdName].execute(bot, message, args);
            console.log(`📥 تم تنفيذ الأمر: ${cmdName} من ${message.senderID}`);
        } catch (err) {
            console.error(`❌ خطأ في تنفيذ الأمر ${cmdName}:`, err);
            await bot.sendMessage(message.threadID, "حدث خطأ أثناء تنفيذ الأمر.");
        }
    }
});

// رسالة ترحيب تلقائية عند دخول عضو جديد
bot.listenMqtt(async (message) => {
    if (message.type === "event" && message.logMessageType === "log:subscribe") {
        const newUserID = message.logMessageData.addedParticipants[0].userFbId;
        const welcomeMsg = `مرحباً بك في بوت ${config.BOT_NAME} 🌸\nأتمنى لك وقت ممتع!`;
        await bot.sendMessage(message.threadID, welcomeMsg);
    }
});

console.log(`🤖 بوت ${config.BOT_NAME} جاهز للعمل!`);          {
            body: "مرحبا بكم في بوت دورا أحبكم سنافري 💋",
            attachment: fs.createReadStream("welcome-dora.jpg") // صورة ترحيب
          },
          event.threadID
        );
      });
    }

    // أوامر البوت
    if (event.type === "message" && event.body) {
      const message = event.body.toLowerCase();

      if (message === "ping") {
        api.sendMessage("Pong 🏓", event.threadID);
      }

      if (message === "مرحبا") {
        api.sendMessage("أهلاً بك! 🌸", event.threadID);
      }
    }
  });
});
