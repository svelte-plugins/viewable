const ChromeDebug = require('chrome-remote-interface');
const chalk = require('chalk');
const isMac = process.platform === 'darwin';

let networkFilter;
let eventFilter;
let recordLogs;

let consoleMessageLog = [];
let networkMessageLog = [];
let dynamicNetworkMessageLog = [];

const severityColors = {
  verbose: (a) => a,
  info: chalk.blue,
  warning: chalk.yellow,
  error: chalk.red
};

const severityIcons = {
  verbose: ' ',
  info: '🛈',
  warning: '⚠',
  error: '⚠'
};

function debugLog(msg) {
  // suppress with DEBUG=-cypress-log-to-output
  if (process.env.DEBUG && process.env.DEBUG.includes('-cypress-log-to-output')) {
    return;
  }

  log(`[cypress-log-to-output] ${msg}`);
}

function log(msg) {
  return isMac && console.log(msg);
}

function logEntry(params) {
  if (eventFilter && !eventFilter('browser', params.entry)) {
    return;
  }

  const { level, source, text, timestamp, url, lineNumber, stackTrace, args } = params.entry;
  const color = severityColors[level];
  const icon = severityIcons[level];

  const prefix = `[${new Date(timestamp).toISOString()}] ${icon} `;
  const prefixSpacer = ' '.repeat(prefix.length);

  const logMessage = `${prefix}${chalk.bold(level)} (${source}): ${text}`;
  const justLogMessage = `${text}`;

  log(color(logMessage));
  recordLogMessage(justLogMessage);

  const logAdditional = (msg) => {
    const additionalLogMessage = `${prefixSpacer}${msg}`;
    const recordAdditionalLogMessage = msg;

    log(color(additionalLogMessage));
    recordLogMessage(recordAdditionalLogMessage);
  };

  if (url) {
    logAdditional(`${chalk.bold('URL')}: ${url}`);
  }

  if (stackTrace && lineNumber) {
    logAdditional(`Stack trace line number: ${lineNumber}`);
    logAdditional(`Stack trace description: ${stackTrace.description}`);
    logAdditional(`Stack call frames: ${stackTrace.callFrames.join(', ')}`);
  }

  if (args) {
    const logThis = [];

    if (Array.isArray(args)) {
      args.forEach((item) => {
        if (item.value && item.value.toString().indexOf('background') < 0 && item.value.toString().indexOf('color') < 0) {
          logThis.push(item.value.toString());
        }
      });
    }

    logAdditional(logThis.join(' '));
  }
}

function logConsole(params) {
  if (eventFilter && !eventFilter('console', params)) {
    return;
  }

  const { type, args, timestamp } = params;
  const level = type === 'error' ? 'error' : 'verbose';
  const color = severityColors[level];
  const icon = severityIcons[level];

  const prefix = `[${new Date(timestamp).toISOString()}] ${icon} `;
  const prefixSpacer = ' '.repeat(prefix.length);

  const logAdditional = (msg) => {
    const logMessage = `${prefixSpacer}${msg}`;
    const justLogMessage = `${msg}`;
    log(color(logMessage));
    recordLogMessage(justLogMessage);
  };

  if (args) {
    const logThis = [];

    if (Array.isArray(args)) {
      args.forEach((item) => {
        if (item.value && item.value.toString().indexOf('background') < 0 && item.value.toString().indexOf('color') < 0) {
          logThis.push(item.value.toString());
        }
      });
    }

    logAdditional(logThis.join(' '));
  }
}

function install(on, filter, options = {}) {
  eventFilter = filter;
  recordLogs = options.recordLogs;
  on('before:browser:launch', browserLaunchHandler);
}

function recordLogMessage(logMessage) {
  if (recordLogs) {
    consoleMessageLog.push(logMessage);
  }
}

function getLogs() {
  return consoleMessageLog;
}

function clearLogs() {
  consoleMessageLog = [];
}

function isChrome(browser) {
  return browser.family === 'chrome' || ['chrome', 'chromium', 'canary'].includes(browser.name) || (browser.family === 'chromium' && browser.name !== 'electron');
}

function ensureRdpPort(args) {
  const existing = args.find((arg) => arg.slice(0, 23) === '--remote-debugging-port');

  if (existing) {
    return Number(existing.split('=')[1]);
  }

  const port = 40000 + Math.round(Math.random() * 25000);

  args.push(`--remote-debugging-port=${port}`);

  return port;
}

function networkResponse(params) {
  if (networkFilter && !networkFilter(params)) {
    return;
  }

  const msg = `Network: Url: ${params.response.url}, Status: ${params.response.status}, Status text: ${params.response.statusText}`;

  log(msg);

  networkMessageLog.push(msg);
  dynamicNetworkMessageLog.push(msg);
}

function getNetworkLogs() {
  return networkMessageLog;
}

function getCurrentNetworkLogs() {
  return dynamicNetworkMessageLog;
}

function clearNetworkLogs() {
  networkMessageLog = [];
  return networkMessageLog;
}

function clearCurrentNetworkLogs() {
  dynamicNetworkMessageLog = [];
  return dynamicNetworkMessageLog;
}

function browserLaunchHandler(browser = {}, launchOptions, consoleFilter, netFilter, options = {}) {
  eventFilter = consoleFilter;
  networkFilter = netFilter;
  recordLogs = options.recordLogs;

  const args = launchOptions.args || launchOptions;

  if (!isChrome(browser)) {
    return debugLog(`Warning: An unsupported browser family was used, output will not be logged to console: ${browser.family}`);
  }

  const rdp = ensureRdpPort(args);

  debugLog('Attempting to connect to Chrome Debugging Protocol');

  const tryConnect = () => {
    // https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response
    new ChromeDebug({
      port: rdp
    })
      .then((chrome) => {
        debugLog('Connected to Chrome Debugging Protocol');

        /** captures logs from the browser */
        chrome.Log.enable();
        chrome.Log.entryAdded(logEntry);

        /** captures logs from console.X calls */
        chrome.Runtime.enable();
        chrome.Runtime.consoleAPICalled(logConsole);

        chrome.Network.enable();
        chrome.Network.responseReceived(networkResponse);

        // The following does set the UI to a Iphone X view, display, but then the Cypress UI
        // has issues with displaying it. You'd have to resize the step window on the left to see the test running
        // In the case of Readmo.js it is enough to call `chrome.Emulation.setTouchEmulationEnabled({enabled:true});`
        // to have Readmo.js think its a mobile device. That is because the code does `if ('ontouchstart' in window) {`

        // const viewportWidth = 375;    // 8.5 in
        // const viewportHeight = 812;  // 11 in
        // //
        // const deviceMetrics = {
        //   width: viewportWidth,
        //   height: viewportHeight,
        //   deviceScaleFactor: 0,
        //   mobile: true,
        //   screenWidth : viewportWidth,
        //   screenHeight : viewportHeight,
        //   screenOrientation: { angle: 0, type: 'portraitPrimary' }
        // };
        // chrome.Emulation.setDeviceMetricsOverride(deviceMetrics);
        // chrome.Emulation.setUserAgentOverride( {userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'})
        // chrome.Emulation.setVisibleSize({width: viewportWidth, height: viewportHeight});

        // Make it optional to turn this on
        if (options.enableTouchEmulation) {
          chrome.Emulation.setTouchEmulationEnabled({ enabled: true });
        }

        chrome.on('disconnect', () => debugLog('Chrome Debugging Protocol disconnected'));
      })
      .catch(() => setTimeout(tryConnect, 100));
  };

  tryConnect();

  return launchOptions;
}

module.exports = {
  _ensureRdpPort: ensureRdpPort,
  install,
  browserLaunchHandler,
  getLogs,
  getNetworkLogs,
  getCurrentNetworkLogs,
  clearLogs,
  clearNetworkLogs,
  clearCurrentNetworkLogs
};
