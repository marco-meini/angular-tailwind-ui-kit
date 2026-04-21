import { describe, expect, it } from 'vitest';
import { uiVariantClasses } from './class-variants';

describe('uiVariantClasses', () => {
  it('applies defaults and flags correctly', () => {
    const result = uiVariantClasses(
      {
        base: 'base',
        variants: { default: 'variant-default', primary: 'variant-primary' },
        sizes: { sm: 'size-sm', md: 'size-md' },
        states: { default: 'state-default', success: 'state-success' },
        disabled: 'is-disabled',
        invalid: 'is-invalid',
        loading: 'is-loading',
      },
      {
        disabled: true,
        invalid: true,
        loading: true,
        className: 'custom-class',
      },
    );

    expect(result).toContain('base');
    expect(result).toContain('variant-default');
    expect(result).toContain('size-md');
    expect(result).toContain('state-default');
    expect(result).toContain('is-disabled');
    expect(result).toContain('is-invalid');
    expect(result).toContain('is-loading');
    expect(result).toContain('custom-class');
  });
});
