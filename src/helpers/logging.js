/***** Logging-Levels:
 * - trace  => logTrace
 * - debug  => logDebug
 * - info   => logInfo
*/

var Perl5CoreSmokeDBWebLogLevel = '';
function setLogLevel(level) {
  // console.log(`setLogLevel(${level}) [${Perl5CoreSmokeDBWebLogLevel}]`);
  Perl5CoreSmokeDBWebLogLevel = level;
  return Perl5CoreSmokeDBWebLogLevel;
}

function logLevel() {
  // console.log(`We have internal: ${Perl5CoreSmokeDBWebLogLevel}`);
  if (Perl5CoreSmokeDBWebLogLevel.length) {
    return Perl5CoreSmokeDBWebLogLevel;
  }
  return import.meta.env.VITE_LOGGING;
}
function wantsTrace() {
  return logLevel() === 'trace';
}

function wantsDebugging() {
  return logLevel() === 'debug' ||
         logLevel() === 'trace';
}

function wantsInfo() {
  return logLevel() === 'info'  ||
         logLevel() === 'debug' ||
         logLevel() === 'trace';
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

export { setLogLevel, logLevel, logTrace, logDebug, logInfo }
