import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';
import { uiVariantClasses } from '../core/class-variants';

@Component({
  selector: 'ui-badge',
  standalone: true,
  template: `<span [class]="classes()"><ng-content /></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadgeComponent {
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = 'sm';
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() className = '';

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'ui-badge',
        variants: {
          default: 'bg-[rgb(var(--ui-muted))] text-[rgb(var(--ui-fg))]',
          primary: 'bg-[rgb(var(--ui-primary))] text-white',
          secondary: 'bg-[rgb(var(--ui-primary))] text-white',
          danger: 'bg-[rgb(var(--ui-danger))] text-white',
          ghost: 'bg-transparent text-[rgb(var(--ui-fg))] border border-[rgb(var(--ui-border))]',
          outline: 'bg-white border border-[rgb(var(--ui-border))] text-[rgb(var(--ui-fg))]',
        },
        sizes: {
          sm: 'text-xs px-2 py-0.5',
          md: 'text-sm px-2.5 py-1',
          lg: 'text-sm px-3 py-1.5',
        },
        states: {
          success: 'ring-1 ring-[rgb(var(--ui-success))]',
          warning: 'ring-1 ring-[rgb(var(--ui-warning))]',
          danger: 'ring-1 ring-[rgb(var(--ui-danger))]',
        },
      },
      {
        variant: this.variant,
        size: this.size,
        state: this.state,
        className: this.className,
      },
    ),
  );
}

@Component({
  selector: 'ui-alert',
  standalone: true,
  template: `
    <section [class]="classes()" role="alert">
      @if (title) {
        <h3 class="text-sm font-semibold">{{ title }}</h3>
      }
      @if (description) {
        <p class="text-sm opacity-90">{{ description }}</p>
      }
      <div class="text-sm opacity-90"><ng-content /></div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAlertComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() className = '';

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'rounded-xl border p-4 space-y-2',
        states: {
          default: 'border-[rgb(var(--ui-border))] bg-white',
          success: 'border-[rgb(var(--ui-success))] bg-[color-mix(in_srgb,rgb(var(--ui-success))_8%,white)]',
          warning: 'border-[rgb(var(--ui-warning))] bg-[color-mix(in_srgb,rgb(var(--ui-warning))_12%,white)]',
          danger: 'border-[rgb(var(--ui-danger))] bg-[color-mix(in_srgb,rgb(var(--ui-danger))_10%,white)]',
        },
      },
      { state: this.state, className: this.className },
    ),
  );
}

@Component({
  selector: 'ui-spinner',
  standalone: true,
  template: `
    <span [class]="classes()" role="status" aria-label="Loading">
      <span class="sr-only">Loading</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSpinnerComponent {
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() className = '';

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'inline-block animate-spin rounded-full border-2 border-[rgb(var(--ui-primary))] border-t-transparent',
        sizes: {
          sm: 'h-4 w-4',
          md: 'h-6 w-6',
          lg: 'h-8 w-8',
        },
      },
      { size: this.size, className: this.className },
    ),
  );
}

@Component({
  selector: 'ui-progress',
  standalone: true,
  template: `
    <div class="h-2 w-full overflow-hidden rounded-full bg-[rgb(var(--ui-muted))]" [attr.aria-valuenow]="value">
      <div class="h-full rounded-full bg-[rgb(var(--ui-primary))] transition-all duration-300" [style.width.%]="safeValue"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressComponent {
  @Input() value = 0;

  get safeValue(): number {
    if (this.value < 0) return 0;
    if (this.value > 100) return 100;
    return this.value;
  }
}

@Component({
  selector: 'ui-label',
  standalone: true,
  template: `<label [for]="forId" class="ui-label">{{ text }}<ng-content /></label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLabelComponent {
  @Input() forId = '';
  @Input() text = '';
}

@Component({
  selector: 'ui-input-group',
  standalone: true,
  template: `
    <div class="ui-input-group">
      @if (prefix) {
        <span class="text-sm text-slate-500">{{ prefix }}</span>
      }
      <input class="ui-input" [placeholder]="placeholder" [value]="value" (input)="onInput($event)" />
      @if (suffix) {
        <span class="text-sm text-slate-500">{{ suffix }}</span>
      }
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputGroupComponent {
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Output() readonly valueChange = new EventEmitter<string>();

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}

@Component({
  selector: 'ui-input',
  standalone: true,
  template: `
    <input
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [class]="classes()"
      [value]="value"
      (input)="onInput($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() variant: UiVariant = 'outline';
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'ui-input',
        variants: {
          outline: 'border border-[rgb(var(--ui-border))] bg-white',
          default: 'border border-[rgb(var(--ui-border))] bg-white',
          ghost: 'border border-transparent bg-[rgb(var(--ui-muted))]',
          primary: 'border border-[rgb(var(--ui-primary))] bg-white',
          secondary: 'border border-[rgb(var(--ui-primary))] bg-white',
          danger: 'border border-[rgb(var(--ui-danger))] bg-white',
        },
        sizes: {
          sm: 'h-8 text-sm',
          md: 'h-10 text-sm',
          lg: 'h-12 text-base',
        },
        states: {
          success: 'ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-success))_25%,transparent)]',
          warning: 'ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-warning))_25%,transparent)]',
          danger: 'ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-danger))_25%,transparent)]',
        },
        disabled: 'cursor-not-allowed opacity-60',
        invalid: 'border-[rgb(var(--ui-danger))] ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-danger))_20%,transparent)]',
        loading: 'animate-pulse',
      },
      {
        size: this.size,
        state: this.state,
        variant: this.variant,
        disabled: this.disabled,
        invalid: this.invalid,
        loading: this.loading,
      },
    ),
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}

@Component({
  selector: 'ui-textarea',
  standalone: true,
  template: `
    <textarea
      [id]="id"
      [rows]="rows"
      [placeholder]="placeholder"
      [disabled]="disabled"
      class="ui-textarea"
      [value]="value"
      (input)="onInput($event)"
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextareaComponent {
  @Input() id = '';
  @Input() rows = 4;
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  template: `
    <label class="inline-flex items-center gap-2 text-sm text-[rgb(var(--ui-fg))]">
      <input type="checkbox" class="h-4 w-4 rounded border-[rgb(var(--ui-border))]" [checked]="checked" [disabled]="disabled" (change)="onToggle($event)" />
      <span>{{ label }}<ng-content /></span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckboxComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  protected onToggle(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.checked = next;
    this.checkedChange.emit(next);
  }
}

@Component({
  selector: 'ui-switch',
  standalone: true,
  template: `
    <label class="inline-flex items-center gap-2">
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="checked"
        [disabled]="disabled"
        [class]="trackClasses()"
        (click)="toggle()"
      >
        <span [class]="thumbClasses()"></span>
      </button>
      <span class="text-sm text-[rgb(var(--ui-fg))]">{{ label }}</span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  protected readonly trackClasses = computed(() =>
    this.checked
      ? 'relative inline-flex h-6 w-11 items-center rounded-full bg-[rgb(var(--ui-primary))] transition-colors disabled:opacity-60'
      : 'relative inline-flex h-6 w-11 items-center rounded-full bg-[rgb(var(--ui-border))] transition-colors disabled:opacity-60',
  );

  protected readonly thumbClasses = computed(() =>
    this.checked
      ? 'inline-block h-5 w-5 translate-x-5 rounded-full bg-white transition-transform'
      : 'inline-block h-5 w-5 translate-x-1 rounded-full bg-white transition-transform',
  );

  protected toggle(): void {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}

export interface UiRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  template: `
    <fieldset class="space-y-2">
      @if (legend) {
        <legend class="mb-1 text-sm font-medium text-[rgb(var(--ui-fg))]">{{ legend }}</legend>
      }
      @for (option of options; track option.value) {
        <label class="flex items-center gap-2 text-sm" [class.opacity-50]="option.disabled">
          <input
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="option.value === value"
            [disabled]="disabled || option.disabled"
            (change)="select(option.value)"
          />
          <span>{{ option.label }}</span>
        </label>
      }
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRadioGroupComponent {
  @Input() legend = '';
  @Input() label = '';
  @Input() name = `ui-radio-group-${Math.random().toString(16).slice(2)}`;
  @Input() options: UiRadioOption[] = [];
  @Input() set items(value: UiRadioOption[]) {
    this.options = value;
  }
  @Input() value = '';
  @Input() disabled = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected select(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}

export const UI_FOUNDATION_COMPONENTS = [
  UiBadgeComponent,
  UiAlertComponent,
  UiSpinnerComponent,
  UiProgressComponent,
  UiLabelComponent,
  UiInputGroupComponent,
  UiInputComponent,
  UiTextareaComponent,
  UiCheckboxComponent,
  UiSwitchComponent,
  UiRadioGroupComponent,
] as const;
