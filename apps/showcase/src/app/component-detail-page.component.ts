import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
} from '@your-scope/ui-kit';
import { SHOWCASE_CATALOG } from './showcase-catalog';

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
  template: `
    @if (activeItem; as item) {
      <section class="space-y-6">
        <header class="space-y-2">
          <p class="text-xs uppercase tracking-wide text-slate-400">Component explorer</p>
          <h1 class="text-2xl font-semibold text-slate-100">{{ item.label }}</h1>
          <p class="text-sm text-slate-400">{{ item.id }}</p>
        </header>

        <div class="ui-card space-y-4">
          @switch (item.id) {
            @case ('ui-badge') {
              <div class="flex flex-wrap items-center gap-2">
                <ui-badge>Default</ui-badge>
                <ui-badge variant="primary">Primary</ui-badge>
                <ui-badge variant="secondary">Secondary</ui-badge>
                <ui-badge variant="danger">Danger</ui-badge>
                <ui-badge variant="outline">Outline</ui-badge>
              </div>
            }
            @case ('ui-alert') {
              <div class="flex flex-col gap-6">
                <ui-alert title="Default alert" description="Base alert styling." />
                <ui-alert title="Warning alert" description="State-aware variants." state="warning" />
                <ui-alert title="Error alert" description="Use the danger state for failures and validation errors." state="danger" />
              </div>
            }
            @case ('ui-spinner') {
              <div class="flex items-center gap-3">
                <ui-spinner size="sm" />
                <ui-spinner size="md" />
                <ui-spinner size="lg" />
              </div>
            }
            @case ('ui-progress') {
              <div class="space-y-3">
                <ui-progress [value]="35" />
                <ui-progress [value]="72" />
              </div>
            }
            @case ('ui-label') {
              <ui-label forId="detail-name" text="Project name" />
              <ui-input id="detail-name" placeholder="tailwind-ui-kit" />
            }
            @case ('ui-input-group') {
              <ui-input-group prefix="@" suffix=".npm" placeholder="your-scope/ui-kit" />
            }
            @case ('ui-input') {
              <div class="space-y-5">
                <div class="space-y-1">
                  <p class="text-xs uppercase tracking-wide text-slate-500">Standard</p>
                  <ui-input placeholder="Standard input" />
                </div>
                <div class="space-y-1">
                  <p class="text-xs uppercase tracking-wide text-slate-500">Ghost variant</p>
                  <ui-input variant="ghost" placeholder="Ghost input" />
                </div>
                <div class="space-y-1">
                  <p class="text-xs uppercase tracking-wide text-slate-500">Success state</p>
                  <ui-input state="success" value="Saved value" placeholder="Success state" />
                </div>
              </div>
            }
            @case ('ui-textarea') {
              <ui-textarea [rows]="4" placeholder="Component notes"></ui-textarea>
            }
            @case ('ui-checkbox') {
              <ui-checkbox [checked]="checkboxEnabled" label="Enable preview option" (checkedChange)="checkboxEnabled = $event" />
              <p class="text-sm text-slate-500">checked={{ checkboxEnabled }}</p>
            }
            @case ('ui-switch') {
              <ui-switch [checked]="switchEnabled" label="Activate feature flag" (checkedChange)="switchEnabled = $event" />
              <p class="text-sm text-slate-500">checked={{ switchEnabled }}</p>
            }
            @case ('ui-radio-group') {
              <ui-radio-group [options]="sizeOptions" [value]="selectedSize" legend="Default size" (valueChange)="selectedSize = $event" />
              <p class="text-sm text-slate-500">selected={{ selectedSize }}</p>
            }
            @case ('ui-breadcrumb') {
              <ui-breadcrumb [items]="breadcrumbs" />
            }
            @case ('ui-tabs') {
              <ui-tabs [tabs]="tabs" [active]="activeTab" (activeChange)="activeTab = $event" />
              <p class="text-sm text-slate-500">active={{ activeTab }}</p>
            }
            @case ('ui-pagination') {
              <ui-pagination [page]="page" [totalPages]="8" (pageChange)="page = $event" />
            }
            @case ('ui-dropdown') {
              <ui-dropdown label="Actions">
                <button type="button" class="ui-menu-item">Duplicate</button>
                <button type="button" class="ui-menu-item">Export</button>
                <button type="button" class="ui-menu-item">Open docs</button>
              </ui-dropdown>
            }
            @case ('ui-dialog') {
              <button type="button" class="ui-button ui-button--primary" (click)="dialogOpen = true">Open dialog</button>
              <ui-dialog [isOpen]="dialogOpen" title="New release" (close)="dialogOpen = false" (confirm)="dialogOpen = false">
                <p class="text-sm text-slate-600">Confirm release publication.</p>
              </ui-dialog>
            }
            @case ('ui-alert-dialog') {
              <button type="button" class="ui-button ui-button--danger" (click)="alertDialogOpen = true">Open alert dialog</button>
              <ui-alert-dialog
                [isOpen]="alertDialogOpen"
                title="Delete branch?"
                message="This action cannot be undone."
                (close)="alertDialogOpen = false"
                (confirm)="alertDialogOpen = false"
              />
            }
            @case ('ui-accordion-item') {
              <ui-accordion-item title="Standalone accordion item">
                This component can also be used independently.
              </ui-accordion-item>
            }
            @case ('ui-accordion') {
              <ui-accordion [items]="accordionItems" />
            }
            @case ('ui-collapsible') {
              <ui-collapsible collapsedLabel="Show details" expandedLabel="Hide details">
                Build pipeline, changelog and smoke tests.
              </ui-collapsible>
            }
            @case ('ui-combobox') {
              <div class="space-y-6">
                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">With nullable</p>
                  <ui-combobox
                    label="Framework"
                    [items]="frameworks"
                    [value]="comboboxNullable"
                    [nullable]="true"
                    nullLabel="No framework"
                    (valueChange)="comboboxNullable = $event"
                  />
                  <p class="text-sm text-slate-500">value={{ comboboxNullable === null ? 'null' : comboboxNullable }}</p>
                </div>
                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Without nullable</p>
                  <ui-combobox
                    label="Framework"
                    [items]="frameworks"
                    [value]="comboboxNotNullable"
                    (valueChange)="comboboxNotNullable = $event"
                  />
                  <p class="text-sm text-slate-500">value={{ comboboxNotNullable ?? '-' }}</p>
                </div>
              </div>
            }
            @case ('ui-select-search') {
              <ui-select-search label="Role" [items]="roles" [value]="role" (valueChange)="role = $event" />
              <p class="text-sm text-slate-500">value={{ role ?? '-' }}</p>
            }
            @case ('ui-typeahead') {
              <ui-typeahead label="Dependency" [items]="dependencies" [value]="dependency" (valueChange)="dependency = $event" />
              <p class="text-sm text-slate-500">value={{ dependency ?? '-' }}</p>
            }
            @case ('ui-datepicker') {
              <div class="space-y-6">
                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">With nullable</p>
                  <ui-datepicker
                    label="Release date"
                    [value]="datePickerNullable"
                    [nullable]="true"
                    (valueChange)="datePickerNullable = $event"
                  />
                  <p class="text-sm text-slate-500">value={{ datePickerNullable === null ? 'null' : datePickerNullable }}</p>
                </div>
                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Without nullable</p>
                  <ui-datepicker
                    label="Release date"
                    [value]="datePickerNotNullable"
                    (valueChange)="datePickerNotNullable = $event"
                  />
                  <p class="text-sm text-slate-500">value={{ datePickerNotNullable === null ? 'null' : datePickerNotNullable }}</p>
                </div>
              </div>
            }
          }
        </div>

        <nav class="flex items-center justify-between border-t border-slate-700 pt-4">
          <button
            type="button"
            class="rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            [disabled]="!previousItem"
            (click)="goTo(previousItem?.id)"
          >
            Previous
          </button>
          <button
            type="button"
            class="rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            [disabled]="!nextItem"
            (click)="goTo(nextItem?.id)"
          >
            Next
          </button>
        </nav>
      </section>
    } @else {
      <section class="ui-card">
        <p class="text-sm text-slate-600">Component not found.</p>
      </section>
    }
  `,
})
export class ComponentDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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
  role: string | null = null;
  dependency: string | null = null;
  datePickerNullable: string | null = null;
  datePickerNotNullable: string | null = null;

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
  readonly roles = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'pm', label: 'Product Manager' },
    { value: 'qa', label: 'QA Engineer' },
  ];
  readonly dependencies = [
    { value: 'cdk', label: '@angular/cdk' },
    { value: 'tailwind', label: 'tailwindcss' },
    { value: 'flatpickr', label: 'flatpickr' },
    { value: 'rxjs', label: 'rxjs' },
  ];

  constructor() {
    this.comboboxNotNullable = this.frameworks[0]?.value ?? null;
    this.datePickerNotNullable = this.defaultIsoDate();
    this.route.paramMap.subscribe((params) => {
      this.activeId = params.get('id') ?? this.activeId;
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
