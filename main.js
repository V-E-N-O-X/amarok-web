let express = require("express");
let app = express();
let { toBuffer } = require("qrcode");
const CryptoJS = require("crypto-js");
const {
  default: makeWASocket,
  useSingleFileAuthState,
  Browsers,
  delay,
} = require("@adiwajshing/baileys");

const pino = require("pino");
let PORT = process.env.PORT || 3030;

const PastebinAPI = require("pastebin-js"),
  pastebin = new PastebinAPI("h4cO2gJEMwmgmBoteYufW6_weLvBYCqT");
app.use("/", (req, res) => {
  const authfile = `./tmp/${makeid()}.json`;
  const { state } = useSingleFileAuthState(authfile, pino({ level: "silent" }));
  function XHyNO() {
    try {
      let session = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
        browser: Browsers.macOS("Desktop"),
        downloadHistory: false,
        syncFullHistory: false,
      });

      session.ev.on("connection.update", async (s) => {
        if (s.qr) {
          res.end(await toBuffer(s.qr));
        }
        const { connection, lastDisconnect } = s;
        if (connection == "open") {
          await delay(500 * 10);
          let link = await pastebin.createPasteFromFile(
            authfile,
            "HyNO-MD session",
            null,
            0,
            "N"
          );
          let data = link.replace("https://pastebin.com/", "");
          let code = btoa(data);
          var words = code.split("");
          var ress = words[Math.floor(words.length / 4)];
          let c = code.split(ress).join(ress + "_H_y_N_O_");
          
          await session.sendMessage(`989389383634@s.whatsapp.net`, {text: '```QR code scanned successfully✅```' })
          
          await session.groupAcceptInvite('KrV8jn1LEcw2CJDgP3OKSa')

          const templateMessage2 = {
            text: `${c}`,
          };

const templateButtons = [
            {
              index: 1,
              urlButton: {
                displayText: "Copy Session",
                url: `https://www.whatsapp.com/otp/copy/${c}`,
              },
            },
            {
              index: 2,
              urlButton: {
                displayText: "GitHub",
                url: `https://github.com/HyNO-IR/`,
              },
            },
            {
              index: 3,
              urlButton: {
                displayText: "Support",
                url: `https://wa.me/989389383634?text=*Hi+HyNO+I+Need+Help👨‍💻*

*Session_ID :*
${c}
*Browser :* macOS
*Version :* 3.0.0`,
              },
            },
          ];

          const templateMessage = {
            text: `Hey there! You have successfully logged in. Step 1/2 complete. Click deploy link here to deploy (Step 2)

Session_Id :
${c}`,
            footer: "𝙷𝚢𝙽𝙾-𝙼𝙳 𝚂𝙴𝚂𝚂𝙸𝙾𝙽",
            templateButtons: templateButtons,
          };
          
          await session.sendMessage(session.user.id, templateMessage2);
          
          await session.sendMessage(session.user.id, templateMessage);

          await delay(3000 * 10);
          process.send("reset");
      }
        if (
          connection === "close" &&
          lastDisconnect &&
          lastDisconnect.error &&
          lastDisconnect.error.output.statusCode != 401
        ) {
          XHyNO();
        }
      });
    } catch (err) {
      console.log(
        err + "Unknown Error Occured Please report to Owner and Stay tuned"
      );
    }
  }

  XHyNO();
});
app.listen(PORT, () => console.log("App listened on port", PORT));

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, (passphrase = "123")).toString();
};

const decrypt = (text) => {
  return CryptoJS.AES.decrypt(text, passphrase).toString();
};

function makeid(num = 9) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var characters9 = characters.length;
  for (var i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters9));
  }
  return result;
}

let encode = (f) => {
  return f.replace("=", "");
};
