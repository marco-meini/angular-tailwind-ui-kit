import { CommonModule } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import type { Options } from 'flatpickr/dist/types/options';

import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';

export interface UiOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const triggerConfig = {
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

const overlayPositions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8,
  },
];

@Component({
  selector: 'ui-combobox',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkOverlayOrigin, CdkConnectedOverlay],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiComboboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-2">
      @if (label) {
        <label class="ui-label">{{ label }}</label>
      }
      <div class="relative" cdkOverlayOrigin #origin="cdkOverlayOrigin">
        <input
          [class]="triggerClasses"
          [attr.placeholder]="placeholder"
          [disabled]="disabled"
          [(ngModel)]="query"
          (input)="onQueryChange()"
          (focus)="open = true"
          (keydown.arrowdown)="onArrowDown($event)"
          (keydown.arrowup)="onArrowUp($event)"
          (keydown.enter)="selectHighlighted($event)"
          (keydown.escape)="open = false"
        />
      </div>
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="open && filteredOptions.length > 0"
        [cdkConnectedOverlayPositions]="positions"
        (overlayOutsideClick)="open = false"
      >
        <div class="ui-menu w-80 max-h-64 overflow-auto">
          @for (option of filteredOptions; track option.value; let idx = $index) {
            <button
              class="ui-menu-item"
              [class.ui-menu-item--active]="idx === highlightedIndex"
              type="button"
              [disabled]="option.disabled"
              (mouseenter)="highlightedIndex = idx"
              (click)="selectOption(option)"
            >
              {{ option.label }}
            </button>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class UiComboboxComponent implements ControlValueAccessor, OnChanges {
  @Input() label = '';
  @Input() placeholder = 'Search...';
  @Input() options: UiOption[] = [];
  @Input() set items(value: UiOption[]) {
    this.options = value;
    this.filteredOptions = value;
  }
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Input() value = '';

  @Output() readonly valueChange = new EventEmitter<string>();

  open = false;
  query = '';
  highlightedIndex = 0;
  filteredOptions: UiOption[] = [];
  readonly positions = overlayPositions;

  private onTouched: () => void = () => {};
  private onChanged: (value: string | null) => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filteredOptions = this.options;
      this.syncQueryFromValue(this.value);
    }
    if (changes['value']) {
      this.syncQueryFromValue(this.value);
    }
  }

  get triggerClasses(): string {
    return uiVariantClasses(triggerConfig, {
      variant: this.variant,
      size: this.size,
      state: this.state,
      disabled: this.disabled,
      invalid: this.invalid,
      loading: this.loading,
    });
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
    this.syncQueryFromValue(this.value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onQueryChange(): void {
    const term = this.query.toLowerCase().trim();
    this.filteredOptions = this.options.filter((option) => option.label.toLowerCase().includes(term));
    this.highlightedIndex = 0;
    this.open = true;
  }

  selectOption(option: UiOption): void {
    this.query = option.label;
    this.value = option.value;
    this.open = false;
    this.onTouched();
    this.onChanged(option.value);
    this.valueChange.emit(option.value);
  }

  onArrowDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!this.open) {
      this.open = true;
      return;
    }
    keyboardEvent.preventDefault();
    this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
  }

  onArrowUp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
  }

  selectHighlighted(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    const option = this.filteredOptions[this.highlightedIndex];
    if (option) {
      this.selectOption(option);
    }
  }

  private syncQueryFromValue(nextValue: string): void {
    const found = this.options.find((option) => option.value === nextValue);
    this.query = found?.label ?? '';
  }
}

@Component({
  selector: 'ui-select-search',
  standalone: true,
  imports: [UiComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-combobox
      [label]="label"
      [placeholder]="placeholder"
      [options]="options"
      [variant]="variant"
      [size]="size"
      [state]="state"
      [disabled]="disabled"
      [invalid]="invalid"
      [loading]="loading"
      [value]="value"
      (valueChange)="onValueChange($event)"
    />
  `,
})
export class UiSelectSearchComponent {
  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() options: UiOption[] = [];
  @Input() set items(value: UiOption[]) {
    this.options = value;
  }
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Input() value = '';

  @Output() readonly valueChange = new EventEmitter<string>();

  protected onValueChange(nextValue: string): void {
    this.value = nextValue;
    this.valueChange.emit(nextValue);
  }
}

@Component({
  selector: 'ui-typeahead',
  standalone: true,
  imports: [UiComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-combobox
      [label]="label"
      [placeholder]="placeholder"
      [options]="options"
      [variant]="variant"
      [size]="size"
      [state]="state"
      [disabled]="disabled"
      [invalid]="invalid"
      [loading]="loading"
      [value]="value"
      (valueChange)="onValueChange($event)"
    />
  `,
})
export class UiTypeaheadComponent {
  @Input() label = '';
  @Input() placeholder = 'Type to search';
  @Input() options: UiOption[] = [];
  @Input() set items(value: UiOption[]) {
    this.options = value;
  }
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Input() value = '';

  @Output() readonly valueChange = new EventEmitter<string>();

  protected onValueChange(nextValue: string): void {
    this.value = nextValue;
    this.valueChange.emit(nextValue);
  }
}

@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-2">
      @if (label) {
        <label class="ui-label">{{ label }}</label>
      }
      <input
        #dateInput
        type="text"
        [class]="inputClasses"
        [attr.placeholder]="placeholder"
        [disabled]="disabled"
      />
    </div>
  `,
})
export class UiDatepickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() label = '';
  @Input() placeholder = 'Pick a date';
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Input() minDate?: string | Date;
  @Input() maxDate?: string | Date;
  @Input() dateFormat = 'Y-m-d';
  @Input() value = '';

  @Output() readonly valueChange = new EventEmitter<string>();

  @ViewChild('dateInput', { static: true }) dateInputRef?: ElementRef<HTMLInputElement>;

  private instance?: FlatpickrInstance;

  ngAfterViewInit(): void {
    this.setupInstance();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    if (changes['disabled']) {
      this.instance.set('clickOpens', !this.disabled);
    }
    if (changes['minDate']) {
      this.instance.set('minDate', this.minDate);
    }
    if (changes['maxDate']) {
      this.instance.set('maxDate', this.maxDate);
    }
    if (changes['value'] && this.value) {
      this.instance.setDate(this.value, false, this.dateFormat);
    }
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
  }

  get inputClasses(): string {
    return uiVariantClasses(triggerConfig, {
      variant: this.variant,
      size: this.size,
      state: this.state,
      disabled: this.disabled,
      invalid: this.invalid,
      loading: this.loading,
    });
  }

  private setupInstance(): void {
    if (!this.dateInputRef?.nativeElement) {
      return;
    }

    const options: Options = {
      dateFormat: this.dateFormat,
      minDate: this.minDate,
      maxDate: this.maxDate,
      defaultDate: this.value || undefined,
      clickOpens: !this.disabled,
      onChange: (_selectedDates, dateStr) => {
        this.value = dateStr;
        this.valueChange.emit(dateStr);
      },
    };
    this.instance = flatpickr(this.dateInputRef.nativeElement, options);
  }
}

@Component({
  selector: 'ui-advanced-demo-state',
  standalone: true,
  imports: [CommonModule, UiComboboxComponent, UiSelectSearchComponent, UiTypeaheadComponent, UiDatepickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="ui-card space-y-3">
      <h3 class="font-semibold">Advanced inputs demo</h3>
      <ui-combobox label="Combobox" [items]="options" (valueChange)="combobox = $event" />
      <ui-select-search label="Select + Search" [items]="options" (valueChange)="select = $event" />
      <ui-typeahead label="Typeahead" [items]="options" (valueChange)="typeahead = $event" />
      <ui-datepicker label="Datepicker" (valueChange)="date = $event" />
      <p class="text-xs text-slate-600">
        combobox={{ combobox || '-' }} select={{ select || '-' }} typeahead={{ typeahead || '-' }} date={{ date || '-' }}
      </p>
    </section>
  `,
})
export class UiAdvancedDemoStateComponent {
  options: UiOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];

  combobox = '';
  select = '';
  typeahead = '';
  date = '';
}
