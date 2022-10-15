import { describe, test, expect, vi } from 'vitest'
import { setLogLevel, logLevel, logInfo, logDebug, logTrace } from 'src/helpers/logging';

describe('testing all loglevels at once', () => {

  test('logLevel === anything', () => {

    const logSpy = vi.spyOn(console, 'log');
    setLogLevel("anything");
    expect(logLevel()).toBe('anything');

    logTrace("Not called");
    expect(logSpy).toHaveBeenCalledTimes(0);

    logDebug("Not called");
    expect(logSpy).toHaveBeenCalledTimes(0);

    logInfo("Not called");
    expect(logSpy).toHaveBeenCalledTimes(0);

    // LogLevel trace
    logSpy.mockReset();
    setLogLevel("trace");
    expect(logLevel()).toBe('trace');

    logTrace("Called-trace");
    expect(logSpy).toHaveBeenLastCalledWith('Called-trace');

    logDebug("Called-debug");
    expect(logSpy).toHaveBeenLastCalledWith('Called-debug');

    logInfo("Called-info");
    expect(logSpy).toHaveBeenLastCalledWith('Called-info');

    // LogLevel debug
    logSpy.mockReset();
    setLogLevel('debug');
    expect(logLevel()).toBe('debug');

    logTrace("Called-trace");
    expect(logSpy).toHaveBeenCalledTimes(0);

    logDebug("Called-debug");
    expect(logSpy).toHaveBeenLastCalledWith('Called-debug');

    logInfo("Called-info");
    expect(logSpy).toHaveBeenLastCalledWith('Called-info');

    // LogLevel info
    logSpy.mockReset();
    setLogLevel('info');
    expect(logLevel()).toBe('info');

    logTrace("Called-trace");
    expect(logSpy).toHaveBeenCalledTimes(0);

    logDebug("Called-debug");
    expect(logSpy).toHaveBeenCalledTimes(0);

    logInfo("Called-info");
    expect(logSpy).toHaveBeenLastCalledWith('Called-info');

  });
});
