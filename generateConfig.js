const fs = require("fs").promises;

const events = [
  "turntable",
  "key1",
  "key2",
  "key3",
  "key4",
  "key5",
  "key6",
  "key7"
];

const config = {};

const format = (text) => {
  const commands = text.split("\n").map((line) => {
    const splitedLine = line.split(" ");
    const device = splitedLine[0].split(":")[0];
    const type = Number(splitedLine[1]).toString();
    const code = parseInt(splitedLine[2], 16);
    const value = parseInt(splitedLine[3], 16);
    return `sendevent ${device} ${type} ${code} ${value}`;
  });
  return commands;
};

const read = async () => {
  for (const event of events) {
    const text = await fs.readFile(`./event/${event}.txt`, "utf8");
    const data = format(text);
    config[event] = data;
  }
};

const write = async () => {
  fs.writeFile("./config.json", JSON.stringify(config));
};

const main = async () => {
  await read();
  await write();
  console.info("done!");
};

main();
