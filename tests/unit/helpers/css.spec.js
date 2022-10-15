import { describe, test, expect } from 'vitest'
import { rowClass, summaryClass } from 'src/helpers/css';

// We mostly don't want runtime errors
describe('rowClass', () => {
  test('rowClass(0) => even', () => {
    expect(rowClass(0)).toBe("even");
  });

  test('rowClass(1) => odd', () => {
    expect(rowClass(1)).toBe("odd");
  });

  test('rowClass(-1) => odd', () => {
    expect(rowClass(-1)).toBe("odd");
  });
});

describe('summaryClass()', () => {
  test('summaryClass("PASS")', () => {
    expect(summaryClass("PASS")).toBe("passtest");
  });

  test('summaryClass("FAIL(c)")', () => {
    expect(summaryClass("FAIL(c)")).toBe("failbuild");
  });

  test('summaryClass("FAIL(C)")', () => {
    expect(summaryClass("FAIL(C)")).toBe("failbuild");
  });

  test('summaryClass("FAIL(m)")', () => {
    expect(summaryClass("FAIL(m)")).toBe("failbuild");
  });

  test('summaryClass("FAIL(M)")', () => {
    expect(summaryClass("FAIL(M)")).toBe("failbuild");
  });

  test('summaryClass("FAIL(X)")', () => {
    expect(summaryClass("FAIL(X)")).toBe("failtodo");
  });

  // Unknown summary's lead to 'failtestc'
  test('summaryClass("FAIL(B)")', () => {
    expect(summaryClass("FAIL(B)")).toBe("failtest");
  });
});
