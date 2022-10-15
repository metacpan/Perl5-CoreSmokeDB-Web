import { describe, test, expect } from 'vitest'
import { hasLength } from 'src/helpers.js';

// We mostly don't want runtime errors
describe('hasLength', () => {
  test('string hasLength("42")', () => {
    expect(hasLength("42")).toBe(true);
  });

  test('number !hasLength(42)', () => {
    expect(hasLength(42)).toBe(false);
  });

  test('array hasLength([1, 2])', () => {
    expect(hasLength([1, 2])).toBe(true);
  });

  test('empty array !hasLength([])', () => {
    expect(hasLength([])).toBe(false);
  });

  test('object !hasLength({that: 42})', () => {
    const object = {that: 42};
    expect(hasLength(object)).toBe(false);
  });

  test('null !hasLenght(null)', () => {
    const nill = null;
    expect(hasLength(nill)).toBe(false);
  });

  test('undefined !hasLenght(undefined)', () => {
    const undef = (function () { return; })();
    expect(hasLength(undef)).toBe(false);
  });
});
