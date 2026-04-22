import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface UiBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
      @for (item of items; track item.label; let isLast = $last) {
        @if (!isLast) {
          <a [href]="item.href || '#'" class="text-slate-400 transition hover:text-[rgb(var(--ui-fg))]">{{ item.label }}</a>
          <span class="text-slate-600">/</span>
        } @else {
          <span class="font-medium text-[rgb(var(--ui-fg))]" aria-current="page">{{ item.label }}</span>
        }
      }
    </nav>
  `,
})
export class UiBreadcrumbComponent {
  @Input() items: UiBreadcrumbItem[] = [];
}
