import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap } from 'rxjs/operators';
import {
  UiAccordionComponent,
  UiAccordionItemComponent,
  UiAlertComponent,
  UiAlertDialogComponent,
  UiBadgeComponent,
  UiBreadcrumbComponent,
  UiCheckboxComponent,
  UiCollapsibleComponent,
  UiComboboxComponent,
  UiDatepickerComponent,
  UiDialogComponent,
  UiDropdownComponent,
  UiInputComponent,
  UiInputGroupComponent,
  UiLabelComponent,
  UiPaginationComponent,
  UiProgressComponent,
  UiRadioGroupComponent,
  UiSelectSearchComponent,
  UiSpinnerComponent,
  UiSwitchComponent,
  UiTabsComponent,
  UiTextareaComponent,
  UiTypeaheadComponent,
  type UiOption,
} from '@your-scope/ui-kit';
import { SHOWCASE_CATALOG } from './showcase-catalog';

interface MockApiPerson {
  id: string;
  name: string;
  avatar?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-component-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    UiAccordionComponent,
    UiAccordionItemComponent,
    UiAlertComponent,
    UiAlertDialogComponent,
    UiBadgeComponent,
    UiBreadcrumbComponent,
    UiCheckboxComponent,
    UiCollapsibleComponent,
    UiComboboxComponent,
    UiDatepickerComponent,
    UiDialogComponent,
    UiDropdownComponent,
    UiInputComponent,
    UiInputGroupComponent,
    UiLabelComponent,
    UiPaginationComponent,
    UiProgressComponent,
    UiRadioGroupComponent,
    UiSelectSearchComponent,
    UiSpinnerComponent,
    UiSwitchComponent,
    UiTabsComponent,
    UiTextareaComponent,
    UiTypeaheadComponent,
  ],
  templateUrl: './component-detail-page.component.html',
})
export class ComponentDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private static readonly MOCK_SELECT_BASE = 'https://69ea358615c7e2d512698126.mockapi.io/tailwind-ui-kit/select';

  readonly catalog = SHOWCASE_CATALOG;

  activeId = this.catalog[0]?.id ?? '';
  checkboxEnabled = true;
  switchEnabled = false;
  selectedSize = 'md';
  activeTab = 'overview';
  page = 2;
  dialogOpen = false;
  alertDialogOpen = false;
  comboboxNullable: string | null = null;
  comboboxNotNullable: string | null = null;
  personSelectValue: string | null = null;
  personTypeaheadValue: string | null = null;
  selectSearchApiItems: UiOption[] = [];
  private selectSearchAllItems: UiOption[] = [];
  typeaheadApiItems: UiOption[] = [];
  selectSearchLoading = false;
  typeaheadLoading = false;
  datePickerNullable: string | null = null;
  datePickerNotNullable: string | null = null;

  private selectSearchLoaded = false;
  private readonly typeaheadQuery$ = new Subject<string>();

  readonly sizeOptions = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
  readonly breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Showcase' },
  ];
  readonly tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'Examples' },
  ];
  readonly accordionItems = [
    { title: 'A11y baseline', content: 'ARIA roles, keyboard support and focus control.' },
    { title: 'Design tokens', content: 'Palette and radius from shared CSS variables.' },
    { title: 'Testing', content: 'Smoke tests for build and runtime usage.' },
  ];
  readonly frameworks = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];

  constructor() {
    this.comboboxNotNullable = this.frameworks[0]?.value ?? null;
    this.datePickerNotNullable = this.defaultIsoDate();
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.activeId = params.get('id') ?? this.activeId;
      if (this.activeId === 'ui-select-search') {
        this.ensureSelectSearchLoaded();
      }
    });
    this.setupTypeaheadRemoteSearch();
  }

  /**
   * Remote-only typeahead: each query is resolved by HTTP.
   * switchMap keeps only the latest request result.
   */
  onTypeaheadQuery(term: string): void {
    this.typeaheadQuery$.next(term);
  }

  onPersonTypeaheadValueChange(next: string | null): void {
    this.personTypeaheadValue = next;
    if (next == null) {
      this.typeaheadApiItems = [];
    }
  }

  onPersonSelectValueChange(next: string | null): void {
    this.personSelectValue = next;
    if (next == null) {
      this.selectSearchApiItems = [];
    }
  }

  onSelectSearchQuery(term: string): void {
    if (!this.selectSearchAllItems.length) {
      return;
    }
    if (!this.selectSearchApiItems.length && term.trim().length > 0) {
      this.selectSearchApiItems = this.selectSearchAllItems.slice();
    }
  }

  private mapPersonRowsToOptions(rows: MockApiPerson[]): UiOption[] {
    return rows.map((row) => ({ value: String(row.id), label: row.name }));
  }

  private ensureSelectSearchLoaded(): void {
    if (this.selectSearchLoaded) {
      return;
    }
    this.selectSearchLoaded = true;
    this.selectSearchLoading = true;
    this.http
      .get<MockApiPerson[]>(ComponentDetailPageComponent.MOCK_SELECT_BASE)
      .pipe(
        map((rows) => this.mapPersonRowsToOptions(rows)),
        catchError(() => of([] as UiOption[])),
        finalize(() => {
          this.selectSearchLoading = false;
        }),
      )
      .subscribe((items) => {
        this.selectSearchAllItems = items;
        this.selectSearchApiItems = items;
      });
  }

  private setupTypeaheadRemoteSearch(): void {
    this.typeaheadQuery$
      .pipe(
        debounceTime(140),
        distinctUntilChanged(),
        switchMap((term) => {
          const trimmed = term.trim();
          if (!trimmed) {
            const keepForLabel = this.personTypeaheadValue
              ? this.typeaheadApiItems.slice()
              : ([] as UiOption[]);
            return of(keepForLabel);
          }
          this.typeaheadLoading = true;
          return this.http
            .get<MockApiPerson[]>(ComponentDetailPageComponent.MOCK_SELECT_BASE, { params: { name: trimmed } })
            .pipe(
              map((rows) => this.mapPersonRowsToOptions(rows)),
              catchError(() => of([] as UiOption[])),
              finalize(() => {
                this.typeaheadLoading = false;
              }),
            );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((items) => {
        this.typeaheadApiItems = items;
      });
  }

  get activeIndex(): number {
    return this.catalog.findIndex((item) => item.id === this.activeId);
  }

  get activeItem() {
    return this.catalog[this.activeIndex];
  }

  get previousItem() {
    if (this.activeIndex <= 0) {
      return null;
    }
    return this.catalog[this.activeIndex - 1] ?? null;
  }

  get nextItem() {
    if (this.activeIndex < 0 || this.activeIndex >= this.catalog.length - 1) {
      return null;
    }
    return this.catalog[this.activeIndex + 1] ?? null;
  }

  goTo(componentId: string | undefined): void {
    if (!componentId) {
      return;
    }
    this.router.navigate(['/components', componentId]);
  }

  private defaultIsoDate(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
