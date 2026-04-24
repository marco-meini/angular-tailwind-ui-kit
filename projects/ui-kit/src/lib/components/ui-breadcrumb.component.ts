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
  templateUrl: './ui-breadcrumb.component.html',
})
export class UiBreadcrumbComponent {
  @Input() items: UiBreadcrumbItem[] = [];
}
