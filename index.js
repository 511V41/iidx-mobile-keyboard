const config = require("./config.json");
const ioHook = require("iohook");
const adb = require("adbkit");
const client = adb.createClient();

const keyFrom = (() => {
  const map = new Map();
  Object.keys(config).forEach((key) => {
    map.set(config[key].keycode, key);
  });
  return key => map.get(key);
})();

const tap = (x, y) => {
  return [
    // down
    "sendevent /dev/input/event1 1 330 1",
    `sendevent /dev/input/event1 3 53 ${x}`,
    `sendevent /dev/input/event1 3 54 ${y}`,
    "sendevent /dev/input/event1 0 0 0",
    // up
    "sendevent /dev/input/event1 1 330 0",
    "sendevent /dev/input/event1 0 0 0",
  ].join(";");
};

const device = async () => {
  const devices = await client.listDevices();
  if (devices.length === 0) {
    console.error("device not found!");
    process.exit(1);
  }
  // 面倒なので1つめのデバイスに決め打ちしちゃう
  return devices[0].id;
};

const dispatch = async (id, name) => {
  const { x, y } = config[name];
  await client.shell(id, tap(x, y));
};

const main = async () => {
  const id = await device();
  console.info(`target device is ${id}`);
  ioHook.on("keydown", async event => {
    const key = keyFrom(event.rawcode);
    if (event.ctrlKey || !key) {
      return;
    }
    await dispatch(id, key);
  });
  ioHook.on("keyup", event => {
    // console.log(event);
  });
  ioHook.start();
};

main();
