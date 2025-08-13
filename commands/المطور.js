case 'مطور':
case 'مطور البوت':
case 'info':
case 'معلومات':
  const botName = "snforBot";
  const developerName = "حمودي سان 🇸🇩";
  const fbLink = "https://www.facebook.com/babasnfor80";

  return message.reply(
    `✨ معلومات المطور:\n\n` +
    `🔧 اسم البوت: ${botName}\n` +
    `👨‍💻 المطور: ${developerName}\n` +
    `🔗 رابط الفيسبوك: ${fbLink}\n\n` +
    `شكرًا لاستخدامك ${botName} 💖`
  );
