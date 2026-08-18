const pty = require("node-pty");
const path = require("path");

const root = __dirname.replace(/\\scripts$/, "");
const env = {
  ...process.env,
  EXPO_ASC_API_KEY_PATH: path.join(root, "AuthKey_84T3YX7863.p8"),
  EXPO_ASC_KEY_ID: "84T3YX7863",
  EXPO_ASC_ISSUER_ID: "6543b00f-d5a8-4e8c-8083-325449adaad0",
  EXPO_APPLE_TEAM_ID: "6N3H43M5JP",
  EXPO_APPLE_TEAM_TYPE: "COMPANY_OR_ORGANIZATION",
  EAS_BUILD_NO_EXPO_GO_WARNING: "true",
};

function autoReply(data) {
  const text = data.toString();
  process.stdout.write(text);
  const lower = text.toLowerCase();
  if (
    lower.includes("generate a new apple distribution certificate") ||
    lower.includes("reuse this distribution certificate") ||
    lower.includes("would you like to set up push notifications") ||
    lower.includes("generate a new provisioning profile") ||
    lower.includes("reuse this provisioning profile")
  ) {
    p.write("y\r");
  }
  if (lower.includes("select the ios distribution certificate")) {
    p.write("\r");
  }
  if (lower.includes("press any key")) {
    p.write("\r");
  }
}

const p = pty.spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["eas-cli", "credentials:configure-build", "-p", "ios", "-e", "production"],
  { name: "xterm-color", cols: 120, rows: 40, cwd: root, env }
);

p.onData(autoReply);
p.onExit(({ exitCode }) => {
  if (exitCode !== 0) process.exit(exitCode);
  console.log("\n--- credentials done, starting build ---\n");
  const b = pty.spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["eas-cli", "build", "--platform", "ios", "--profile", "production", "--auto-submit", "--non-interactive"],
    { name: "xterm-color", cols: 120, rows: 40, cwd: root, env }
  );
  b.onData((d) => process.stdout.write(d.toString()));
  b.onExit(({ exitCode: code }) => process.exit(code ?? 1));
});
