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
  templateUrl: './ui-advanced-demo-state.component.html',
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
