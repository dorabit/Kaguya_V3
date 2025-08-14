import express from "express";
import config from "./KaguyaSetUp/config.js";
import { log } from "./logger/index.js";
import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || config.port || 8040;

// عرض الملفات الثابتة مثل الصور من مجلد public
app.use("/public", express.static(join(__dirname, "public")));

// صفحة ترحيب
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "./utils/welcome.html"));
});

// تشغيل الخادم
app.listen(PORT, () => {
  log([
    { message: "[ EXPRESSJS ]: ", color: "green" },
    { message: `Dora Bot is running on port: ${PORT}`, color: "white" },
  ]);
});

// تحديد ملف البوت (app.js أو index.js)
function resolveBotEntry() {
  const candidates = ["app.js", "app.mjs", "app.cjs", "index.js", "index.mjs", "index.cjs"];
  for (const f of candidates) {
    if (existsSync(join(__dirname, f))) return f;
  }
  throw new Error("❌ لم يتم العثور على ملف تشغيل البوت (app أو index).");
}

// تشغيل البوت كعملية فرعية
function startBotProcess(script) {
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", script], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (codeExit) => {
    console.log(`💡 ${script} process exited with code: ${codeExit}`);
    if (codeExit !== 0) {
      console.log("🔄 إعادة تشغيل البوت خلال 3 ثوانٍ...");
      setTimeout(() => startBotProcess(script), 3000);
    }
  });

  child.on("error", (error) => {
    console.error(`❌ حدث خطأ عند تشغيل البوت: ${error}`);
  });
}

// بدء تشغيل البوت
startBotProcess(resolveBotEntry());
