console.log("\n");

console.log('\x1b[34m%s\x1b[0m', '  ██╗░░░░░░█████╗░███╗░░██╗██████╗░██████╗░░█████╗░\n');
console.log('\x1b[34m%s\x1b[0m', '  ██║░░░░░██╔══██╗████╗░██║██╔══██╗██╔══██╗██╔══██╗\n');
console.log('\x1b[34m%s\x1b[0m', '  ██║░░░░░██║░░██║██╔██╗██║██║░░██║██████╔╝███████║\n');
console.log('\x1b[34m%s\x1b[0m', '  ██║░░░░░██║░░██║██║╚████║██║░░██║██╔══██╗██╔══██║\n');
console.log('\x1b[34m%s\x1b[0m', '  ███████╗╚█████╔╝██║░╚███║██████╔╝██║░░██║██║░░██║\n');
console.log('\x1b[34m%s\x1b[0m', '  ╚══════╝░╚════╝░╚═╝░░╚══╝╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝\n');
console.log('\x1b[34m%s\x1b[0m', '                               Anthell & NightShade                                           \n');
console.log('\x1b[34m%s\x1b[0m', '                               Piyasanın kralları xd                            \n');


const readline = require("readline");
const request = require("request");
const delay = require("delay");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("\x1b[31m token gir:\x1b[0m ", (token) => {
  rl.question("\x1b[34m server id:\x1b[0m ", (guildId) => {
     rl.question("\x1b[34m url :\x1b[0m ", (vanityUrl) => {
        rl.question("\x1b[34m webhook url :\x1b[0m ", (webhookUrl) => {
        const headers = {
          "authorization": token,
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        };

        async function checkVanity() {
          while (true) {
            try {
              if (vanityUrl === "") {
                console.log('\x1b[36m%s\x1b[0m',"url girmeyi unuttun orospunun cocu");
              } else {
                request.get({
                  url: `https://discord.com/api/v9/invites/${vanityUrl}?with_counts=true&with_expiration=true`,
                  headers: headers
                }, (error, response, body) => {
                  if (response && response.statusCode == 404) {
                    console.log('\x1b[32m%s\x1b[0m',`URL Değiştirildi ${vanityUrl}`);
                    changeVanity();
                  } else {
                    console.log('\x1b[31m%s\x1b[0m',`Aktif Almayi Deniyorum: ${vanityUrl}`);
                  }
                });
              }
              await delay(200);
            } catch (error) {
              console.log('\x1b[31m%s\x1b[0m', "Rate limited :(");
              await delay(5000);
            }
          }
        }

        function changeVanity() {
          const payload = { "code": vanityUrl };
          request.patch({
            url: `https://discord.com/api/v10/guilds/${guildId}/vanity-url`,
            headers: headers,
            json: payload
          }, (error, response, body) => {
            if (response.statusCode == 200) {
              console.log('\x1b[36m%s\x1b[0m',`> URL Alındı ${vanityUrl}`);
              const data = {
                content: `@everyone discord.gg/${vanityUrl} Başarılı xd`,
                username: "anthel & night",
                avatar_url: "https://i.imgoKzng"
              };      
              request.post({
                url: webhookUrl,
                json: data
              }, () => {
                process.exit(); 
              });
            } else {
              console.log('\x1b[36m%s\x1b[0m',`> Vanity URL could not be changed, error code: ${response.statusCode}`);
            }
          });
        }
        
        checkVanity();
      });
    });
  });
});

