import { Component, Input } from '@angular/core';
import { UiAccordionItemComponent } from './ui-accordion-item.component';

export interface UiAccordionEntry {
  title: string;
  content: string;
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [UiAccordionItemComponent],
  templateUrl: './ui-accordion.component.html',
})
export class UiAccordionComponent {
  @Input() items: UiAccordionEntry[] = [];
}
