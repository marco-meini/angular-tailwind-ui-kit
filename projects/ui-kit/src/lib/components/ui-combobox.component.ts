import { CommonModule } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';
import { uiFieldTriggerConfig } from './ui-field-trigger-config';

export interface UiOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/** Internal only: never use as a real option `value` from the outside. */
const UI_COMBOBOX_NULL = '__ui_combobox_null__';

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
          (focus)="onFocusInput()"
          (keydown.arrowdown)="onArrowDown($event)"
          (keydown.arrowup)="onArrowUp($event)"
          (keydown.enter)="selectHighlighted($event)"
          (keydown.escape)="open = false"
        />
        @if (showClear) {
          <button
            type="button"
            class="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 rounded p-0.5 text-slate-400 transition hover:text-[rgb(var(--ui-fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ui-primary))]"
            (click)="clearValue($event)"
            aria-label="Clear selection"
            title="Clear selection"
          >
            <span class="text-lg leading-none" aria-hidden="true">×</span>
          </button>
        }
      </div>
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="open && menuOptions.length > 0"
        [cdkConnectedOverlayPositions]="positions"
        (overlayOutsideClick)="open = false"
      >
        <div class="ui-menu w-80 max-h-64 overflow-auto">
          @for (option of menuOptions; track option.value; let idx = $index) {
            <button
              class="ui-menu-item"
              [class.ui-menu-item--active]="idx === highlightedIndex"
              [class.ui-menu-item--muted]="isNullOption(option)"
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
  }
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  /** When true, value may be `null` and a clear action + a null row in the list is shown. */
  @Input() nullable = false;
  /** Label for the synthetic null option (e.g. "No selection", "Nessun valore"). */
  @Input() nullLabel = 'No selection';
  @Input() value: string | null = null;

  @Output() readonly valueChange = new EventEmitter<string | null>();

  open = false;
  /** Text in the field (label when selected, or what the user is typing). */
  query = '';
  /** Drives list filtering; cleared when the panel opens so all options are visible with a value selected. */
  private filterTerm = '';
  highlightedIndex = 0;
  menuOptions: UiOption[] = [];
  readonly positions = overlayPositions;

  private onTouched: () => void = () => {};
  private onChanged: (value: string | null) => void = () => {};
  private readonly nullOptionValue = UI_COMBOBOX_NULL;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['items'] || changes['nullable'] || changes['nullLabel'] || changes['value']) {
      this.syncQueryFromValue(this.value);
    }
  }

  onFocusInput(): void {
    this.filterTerm = '';
    this.rebuildMenuOptions();
    this.open = true;
  }

  get showClear(): boolean {
    return this.nullable && !this.disabled && this.hasValue();
  }

  get triggerClasses(): string {
    const base = uiVariantClasses(uiFieldTriggerConfig, {
      variant: this.variant,
      size: this.size,
      state: this.state,
      disabled: this.disabled,
      invalid: this.invalid,
      loading: this.loading,
    });
    return this.showClear ? `${base} pr-9` : base;
  }

  writeValue(value: string | null | undefined): void {
    this.value = value == null || value === '' ? null : value;
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

  isNullOption(option: UiOption): boolean {
    return option.value === this.nullOptionValue;
  }

  onQueryChange(): void {
    this.filterTerm = this.query;
    this.rebuildMenuOptions();
    this.highlightedIndex = 0;
    this.open = true;
  }

  selectOption(option: UiOption): void {
    if (this.isNullOption(option)) {
      this.setValueAndEmit(null);
      this.query = '';
      this.filterTerm = '';
      this.open = false;
      this.onTouched();
      this.rebuildMenuOptions();
      return;
    }
    this.setValueAndEmit(option.value);
    this.query = option.label;
    this.filterTerm = '';
    this.open = false;
    this.onTouched();
    this.rebuildMenuOptions();
  }

  clearValue(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.setValueAndEmit(null);
    this.query = '';
    this.filterTerm = '';
    this.open = false;
    this.onTouched();
    this.rebuildMenuOptions();
  }

  onArrowDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!this.open) {
      this.filterTerm = '';
      this.rebuildMenuOptions();
      this.open = true;
      return;
    }
    keyboardEvent.preventDefault();
    this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.menuOptions.length - 1);
  }

  onArrowUp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
  }

  selectHighlighted(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    const option = this.menuOptions[this.highlightedIndex];
    if (option) {
      this.selectOption(option);
    }
  }

  private hasValue(): boolean {
    return this.value != null && this.value !== '';
  }

  private setValueAndEmit(next: string | null): void {
    this.value = next;
    this.onChanged(next);
    this.valueChange.emit(next);
  }

  private rebuildMenuOptions(): void {
    const term = this.filterTerm.toLowerCase().trim();
    const userMatches = this.options.filter((option) => option.label.toLowerCase().includes(term));
    if (!this.nullable) {
      this.menuOptions = userMatches;
      return;
    }
    const nullMatches = !term || this.nullLabel.toLowerCase().includes(term);
    const nullRow: UiOption = { value: this.nullOptionValue, label: this.nullLabel };
    this.menuOptions = nullMatches ? [nullRow, ...userMatches] : userMatches;
  }

  private syncQueryFromValue(nextValue: string | null): void {
    if (nextValue == null || nextValue === '') {
      this.query = '';
      this.filterTerm = '';
      this.rebuildMenuOptions();
      return;
    }
    const found = this.options.find((option) => option.value === nextValue);
    this.query = found?.label ?? '';
    this.filterTerm = '';
    this.rebuildMenuOptions();
  }
}
