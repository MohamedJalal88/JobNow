const { spawnSync } = require('child_process');
const fs = require('fs');

const logPath = 'C:\\Users\\aysha\\Desktop\\PDD\\appium-tests\\adb_wrapper_log.txt';
const args = process.argv.slice(2);

let hasShell = false;
let hasPs = false;
let hasA = false;

for (let i = 0; i < args.length; i++) {
    if (args[i] === 'shell') hasShell = true;
    if (args[i] === 'ps') hasPs = true;
    if (args[i] === '-A' || args[i] === '-e') hasA = true;
}

const newArgs = [];
for (let i = 0; i < args.length; i++) {
    newArgs.push(args[i]);
    if (hasShell && hasPs && !hasA && args[i] === 'ps') {
        newArgs.push('-A');
    }
}

try {
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ORIG: ${args.join(' ')} | NEW: ${newArgs.join(' ')}\n`);
} catch (e) {}

const realAdb = 'C:\\Users\\aysha\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe';

const result = spawnSync(realAdb, newArgs, {
    stdio: 'inherit',
    windowsHide: true
});

process.exit(result.status === null ? 1 : result.status);
