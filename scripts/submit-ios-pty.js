const pty = require("node-pty");
const path = require("path");

const root = path.join(__dirname, "..");
const p8Path = "D:/Ai-Workspace/LeanMindset-V3/AuthKey_84T3YX7863.p8";
let step = "start";
let pathSent = false;

const env = {
  ...process.env,
  EXPO_ASC_API_KEY_PATH: p8Path,
  EXPO_ASC_KEY_ID: "84T3YX7863",
  EXPO_ASC_ISSUER_ID: "6543b00f-d5a8-4e8c-8083-325449adaad0",
  EXPO_APPLE_TEAM_ID: "6N3H43M5JP",
  EXPO_APPLE_TEAM_TYPE: "COMPANY_OR_ORGANIZATION",
};

function autoReply(data) {
  const text = data.toString();
  process.stdout.write(text);
  const lower = text.toLowerCase();

  if (step === "start" && lower.includes("generate a new app store connect api key")) {
    step = "wait-path";
    setTimeout(() => p.write("n\r"), 100);
    return;
  }

  if (step === "wait-path" && !pathSent && lower.includes("path to app store connect api key")) {
    pathSent = true;
    step = "wait-keyid";
    setTimeout(() => p.write(p8Path + "\r"), 300);
    return;
  }

  if (step === "wait-keyid" && lower.includes("key id")) {
    step = "wait-issuer";
    setTimeout(() => p.write("84T3YX7863\r"), 100);
    return;
  }

  if (step === "wait-issuer" && lower.includes("issuer id")) {
    step = "done";
    setTimeout(() => p.write("6543b00f-d5a8-4e8c-8083-325449adaad0\r"), 100);
  }
}

const p = pty.spawn(process.platform === "win32" ? "npx.cmd" : "npx", ["eas-cli", "submit", "-p", "ios", "--latest"], {
  name: "xterm-color",
  cols: 120,
  rows: 40,
  cwd: root,
  env,
});

p.onData(autoReply);
p.onExit(({ exitCode }) => process.exit(exitCode ?? 0));
