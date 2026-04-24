import type { UiSize, UiState, UiVariant } from './tokens';

export type ClassValue = string | null | undefined | false;

export interface UiClassVariantConfig {
  base: string;
  variants?: Partial<Record<UiVariant, string>>;
  sizes?: Partial<Record<UiSize, string>>;
  states?: Partial<Record<UiState, string>>;
  disabled?: string;
  invalid?: string;
  loading?: string;
}

export interface UiClassVariantInput {
  variant?: UiVariant;
  size?: UiSize;
  state?: UiState;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  className?: string;
}

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

export function withDefaults<T extends UiClassVariantInput>(
  value: T,
  defaults: Required<Pick<UiClassVariantInput, 'variant' | 'size' | 'state'>>,
): T & Required<Pick<UiClassVariantInput, 'variant' | 'size' | 'state'>> {
  return {
    ...value,
    variant: value.variant ?? defaults.variant,
    size: value.size ?? defaults.size,
    state: value.state ?? defaults.state,
  };
}

export function uiVariantClasses(config: UiClassVariantConfig, input: UiClassVariantInput): string {
  const normalized = withDefaults(input, {
    variant: 'default',
    size: 'md',
    state: 'default',
  });

  return cx(
    config.base,
    config.variants?.[normalized.variant],
    config.sizes?.[normalized.size],
    config.states?.[normalized.state],
    normalized.disabled ? config.disabled : undefined,
    normalized.invalid ? config.invalid : undefined,
    normalized.loading ? config.loading : undefined,
    normalized.className,
  );
}
