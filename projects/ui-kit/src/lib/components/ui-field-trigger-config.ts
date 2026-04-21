export const uiFieldTriggerConfig = {
  base: 'ui-input',
  variants: {
    default: '',
    primary: '',
    secondary: '',
    ghost: '',
    danger: '',
    outline: '',
  },
  sizes: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  },
  states: {
    default: '',
    success: '',
    warning: '',
    danger: '',
  },
  invalid: 'border-[rgb(var(--ui-danger))]',
  disabled: 'opacity-60 pointer-events-none',
};
