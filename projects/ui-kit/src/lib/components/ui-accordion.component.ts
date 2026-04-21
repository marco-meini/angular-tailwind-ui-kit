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
  template: `
    <section class="space-y-2">
      @for (item of items; track item.title) {
        <ui-accordion-item [title]="item.title">
          {{ item.content }}
        </ui-accordion-item>
      }
    </section>
  `,
})
export class UiAccordionComponent {
  @Input() items: UiAccordionEntry[] = [];
}
