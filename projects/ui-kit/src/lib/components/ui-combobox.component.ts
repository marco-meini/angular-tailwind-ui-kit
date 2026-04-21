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
    return uiVariantClasses(uiFieldTriggerConfig, {
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
