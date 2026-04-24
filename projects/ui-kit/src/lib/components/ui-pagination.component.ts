import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-pagination.component.html',
})
export class UiPaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 10;
  @Output() readonly pageChange = new EventEmitter<number>();

  goTo(nextPage: number): void {
    if (nextPage < 1 || nextPage > this.totalPages) {
      return;
    }
    this.page = nextPage;
    this.pageChange.emit(nextPage);
  }
}
