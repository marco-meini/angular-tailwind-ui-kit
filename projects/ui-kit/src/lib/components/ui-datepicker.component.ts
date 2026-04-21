import { CommonModule } from '@angular/common';
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
    return uiVariantClasses(uiFieldTriggerConfig, {
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
