import { CommonModule } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  templateUrl: './ui-combobox.component.html',
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
  /** When true, value may be `null` and a clear (×) control is shown when a value is set. */
  @Input() nullable = false;
  /** When true (and `nullable`), a synthetic first row with `nullLabel` is shown in the menu. When false, use only the × control to clear. */
  @Input() nullMenuOption = true;
  /** Label for the synthetic null option (e.g. "No selection", "Nessun valore"). */
  @Input() nullLabel = 'No selection';
  /**
   * When true, options are assumed to be pre-filtered (e.g. remote API); the menu lists all
   * current `options` without client-side label matching. Use for typeahead / server-driven lists.
   */
  @Input() remoteFilter = false;
  @Input() value: string | null = null;

  @Output() readonly valueChange = new EventEmitter<string | null>();
  /** Current search token used to build the menu (for remote filtering). Not the display label when a value is selected. */
  @Output() readonly queryChange = new EventEmitter<string>();

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

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const valueChanged = !!changes['value'];
    const optionsChanged = !!(changes['options'] || changes['items']);
    const menuConfigChanged = !!(
      changes['nullable'] ||
      changes['nullMenuOption'] ||
      changes['nullLabel']
    );
    const optionsOnly =
      optionsChanged && !valueChanged && !menuConfigChanged && !changes['remoteFilter'];
    const menuConfigOnly =
      menuConfigChanged && !valueChanged && !optionsChanged && !changes['remoteFilter'];
    const preserveSearchWhenEmpty = optionsOnly || menuConfigOnly;

    if (
      changes['options'] ||
      changes['items'] ||
      changes['nullable'] ||
      changes['nullMenuOption'] ||
      changes['nullLabel'] ||
      changes['remoteFilter'] ||
      changes['value']
    ) {
      this.syncQueryFromValue(this.value, { preserveSearchWhenEmpty });
    }
  }

  onFocusInput(): void {
    if (this.remoteFilter) {
      // Keep the visible search text as the remote query (typeahead.js-style). Clearing to '' here
      // used to emit an empty fetch while the input still showed text, leaving stale suggestions open.
      this.filterTerm = this.hasValue() ? '' : this.query;
    } else {
      this.filterTerm = '';
    }
    this.emitFilterQuery();
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
    this.emitFilterQuery();
  }

  selectOption(option: UiOption): void {
    if (this.isNullOption(option)) {
      this.setValueAndEmit(null);
      this.query = '';
      this.filterTerm = '';
      this.open = false;
      this.onTouched();
      this.rebuildMenuOptions();
      this.emitFilterQuery();
      return;
    }
    this.setValueAndEmit(option.value);
    this.query = option.label;
    this.filterTerm = '';
    this.open = false;
    this.onTouched();
    this.rebuildMenuOptions();
    this.emitFilterQuery();
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
    this.emitFilterQuery();
  }

  onArrowDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!this.open) {
      if (this.remoteFilter) {
        this.filterTerm = this.hasValue() ? '' : this.query;
      } else {
        this.filterTerm = '';
      }
      this.emitFilterQuery();
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
    const userMatches = this.remoteFilter
      ? [...this.options]
      : this.options.filter((option) => option.label.toLowerCase().includes(term));
    if (!this.nullable || !this.nullMenuOption) {
      this.menuOptions = userMatches;
      return;
    }
    const nullMatches = !term || this.nullLabel.toLowerCase().includes(term);
    const nullRow: UiOption = { value: this.nullOptionValue, label: this.nullLabel };
    this.menuOptions = nullMatches ? [nullRow, ...userMatches] : userMatches;
  }

  private syncQueryFromValue(
    nextValue: string | null,
    ctx: { preserveSearchWhenEmpty?: boolean } = {},
  ): void {
    const preserve = ctx.preserveSearchWhenEmpty ?? false;
    if (nextValue == null || nextValue === '') {
      if (preserve) {
        this.rebuildMenuOptions();
        this.cdr.markForCheck();
        return;
      }
      this.query = '';
      this.filterTerm = '';
      this.rebuildMenuOptions();
      this.emitFilterQuery();
      return;
    }
    const found = this.options.find((option) => option.value === nextValue);
    this.query = found?.label ?? '';
    this.filterTerm = '';
    this.rebuildMenuOptions();
    this.emitFilterQuery();
  }

  private emitFilterQuery(): void {
    this.queryChange.emit(this.filterTerm);
    this.cdr.markForCheck();
  }
}
