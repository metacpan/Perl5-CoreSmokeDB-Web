/***** Logging-Levels:
 * - trace  => logTrace
 * - debug  => logDebug
 * - info   => logInfo
*/
function wantsTrace() {
  return import.meta.env.VITE_LOGGING === 'trace';
}

function wantsDebugging() {
  // console.log(`LOGGING: '${import.meta.env.VITE_LOGGING}'`);
  return import.meta.env.VITE_LOGGING === 'debug' ||
         import.meta.env.VITE_LOGGING === 'trace';
}

function wantsInfo() {
  return import.meta.env.VITE_LOGGING === 'info'  ||
         import.meta.env.VITE_LOGGING === 'debug' ||
         import.meta.env.VITE_LOGGING === 'trace';
}

function logTrace(message) {
  if (wantsTrace()) { console.log(message); }
}

function logDebug(message) {
  if (wantsDebugging()) { console.log(message); }
}

function logInfo(message) {
  if (wantsInfo()) { console.log(message); }
}

export { logTrace, logDebug, logInfo }
