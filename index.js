import login from "@xaviabot/fca-unofficial";
import fs from "fs";
import path from "path";
import gradient from "gradient-string";
import figlet from "figlet";

const appStatePath = path.join(process.cwd(), "appstate.json"); // ملف تسجيل الدخول

// طباعة اسم البوت بألوان
console.log(
  gradient.rainbow(
    figlet.textSync("DORA BOT", {
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  )
);

// تسجيل الدخول وتشغيل البوت
login({ appState: JSON.parse(fs.readFileSync(appStatePath, "utf8")) }, (err, api) => {
  if (err) return console.error(err);

  api.setOptions({
    listenEvents: true,
    selfListen: false
  });

  console.log(gradient.pastel("✅ Dora Bot جاهز للعمل!"));

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    // ترحيب بالعضو الجديد
    if (event.type === "event" && event.logMessageType === "log:subscribe") {
      event.logMessageData.addedParticipants.forEach((participant) => {
        api.sendMessage(
          {
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
