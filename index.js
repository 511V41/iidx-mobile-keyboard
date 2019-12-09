const config = require("./config.json");
const keypress = require('keypress');
const adb = require('adbkit');
const client = adb.createClient();

const device = async () => {
  const devices = await client.listDevices();
  if (devices.length === 0) {
    console.error("device not found!");
    process.exit(1);
  }
  // 面倒なので1つめのデバイスに決め打ちしちゃう
  return devices[0].id;
};

const dispatchEvent = async (id, name) => {
  const commands = config[name];
  for (const command of commands) {
    await client.shell(id, command);
  }
};

const main = async () => {
  const id = await device();
  keypress(process.stdin);
  process.stdin.on('keypress', async (ch, key) => {
    console.info(key.name);
    if (!key.ctrl) {
      switch (key.name) {
        case "a":
          await dispatchEvent(id, "turntable");
          break;
        case "z":
          await dispatchEvent(id, "key1");
          break;
        case "s":
          await dispatchEvent(id, "key2");
          break;
        case "x":
          await dispatchEvent(id, "key3");
          break;
        case "d":
          await dispatchEvent(id, "key4");
          break;
        case "c":
          await dispatchEvent(id, "key5");
          break;
        case "f":
          await dispatchEvent(id, "key6");
          break;    
        case "v":
          await dispatchEvent(id, "key7");
          break;    
      }
    }
    // Ctrl + C
    if (key && key.ctrl && key.name == 'c') {
      process.stdin.pause();
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
};

main();
