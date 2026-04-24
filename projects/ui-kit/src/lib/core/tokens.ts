export type UiVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type UiSize = 'sm' | 'md' | 'lg';
export type UiState = 'default' | 'success' | 'warning' | 'danger';

export interface UiComponentStateInput {
  variant?: UiVariant;
  size?: UiSize;
  state?: UiState;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
}

export const UI_DEFAULTS = {
  variant: 'default' as UiVariant,
  size: 'md' as UiSize,
  state: 'default' as UiState,
};
