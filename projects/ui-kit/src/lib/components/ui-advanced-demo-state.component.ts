import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiComboboxComponent, type UiOption } from './ui-combobox.component';
import { UiDatepickerComponent } from './ui-datepicker.component';
import { UiSelectSearchComponent } from './ui-select-search.component';
import { UiTypeaheadComponent } from './ui-typeahead.component';

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
      <ui-datepicker label="Datepicker" [nullable]="true" (valueChange)="date = $event" />
      <p class="text-xs text-slate-600">
        combobox={{ combobox ?? '-' }} select={{ select ?? '-' }} typeahead={{ typeahead ?? '-' }} date={{ date === null ? 'null' : (date || '-') }}
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

  combobox: string | null = null;
  select: string | null = null;
  typeahead: string | null = null;
  date: string | null = null;
}
