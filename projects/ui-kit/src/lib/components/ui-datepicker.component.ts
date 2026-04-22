import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import flatpickr from 'flatpickr';
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import type { Options } from 'flatpickr/dist/types/options';

import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';
import { uiFieldTriggerConfig } from './ui-field-trigger-config';

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
      <div class="relative">
        <input
          #dateInput
          type="text"
          [class]="inputClasses"
          [attr.placeholder]="placeholder"
          [disabled]="disabled"
        />
        @if (showClear) {
          <button
            type="button"
            class="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 rounded p-0.5 text-slate-400 transition hover:text-[rgb(var(--ui-fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ui-primary))]"
            (click)="clearValue($event)"
            aria-label="Clear date"
            title="Clear date"
          >
            <span class="text-lg leading-none" aria-hidden="true">×</span>
          </button>
        }
      </div>
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
  /** When true, the value can be empty (`null`); a clear (×) control is shown when a date is set. */
  @Input() nullable = false;
  @Input() value: string | null = null;

  @Output() readonly valueChange = new EventEmitter<string | null>();

  @ViewChild('dateInput', { static: true }) dateInputRef?: ElementRef<HTMLInputElement>;

  constructor(private readonly cdr: ChangeDetectorRef) {}

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
    if (changes['value']) {
      if (this.value) {
        this.instance.setDate(this.value, false, this.dateFormat);
      } else {
        this.instance.clear();
      }
    }
  }

  get showClear(): boolean {
    return this.nullable && !this.disabled && this.hasValue();
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
  }

  get inputClasses(): string {
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
        const next = dateStr && dateStr.length > 0 ? dateStr : null;
        this.value = next;
        this.valueChange.emit(next);
        this.cdr.markForCheck();
      },
    };
    this.instance = flatpickr(this.dateInputRef.nativeElement, options);
  }

  clearValue(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.value = null;
    this.instance?.clear();
    this.valueChange.emit(null);
    this.cdr.markForCheck();
  }

  private hasValue(): boolean {
    return this.value != null && this.value !== '';
  }
}
