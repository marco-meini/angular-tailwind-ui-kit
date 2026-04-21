import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  UiAccordionComponent,
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

@Component({
  selector: 'app-showcase-overview-page',
  standalone: true,
  imports: [CommonModule, UiAlertComponent, UiBadgeComponent, UiSpinnerComponent, UiProgressComponent],
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">Angular Tailwind UI Kit</h1>
      <p class="text-slate-600">Libreria incrementale con componenti base, interattivi e avanzati.</p>
      <div class="grid gap-4 lg:grid-cols-2">
        <ui-alert title="Setup completato" description="Workspace, Tailwind e componenti pronti." />
        <div class="ui-card space-y-3">
          <h2 class="text-lg font-semibold text-slate-900">Stati</h2>
          <div class="flex flex-wrap gap-2">
            <ui-badge>Default</ui-badge>
            <ui-badge variant="primary">Primary</ui-badge>
            <ui-badge variant="secondary">Secondary</ui-badge>
            <ui-badge variant="danger">Danger</ui-badge>
          </div>
          <ui-progress [value]="72" />
          <div class="flex items-center gap-2 text-sm text-slate-600">
            <ui-spinner size="sm" />
            <span>Build di esempio in corso</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ShowcaseOverviewPageComponent {}

@Component({
  selector: 'app-showcase-foundation-page',
  standalone: true,
  imports: [
    CommonModule,
    UiInputComponent,
    UiInputGroupComponent,
    UiLabelComponent,
    UiTextareaComponent,
    UiCheckboxComponent,
    UiSwitchComponent,
    UiRadioGroupComponent,
  ],
  template: `
    <section class="space-y-4">
      <h1 class="text-2xl font-bold text-slate-900">Foundation & Form</h1>
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="ui-card space-y-3">
          <h2 class="text-base font-semibold text-slate-900">Input</h2>
          <ui-label text="Nome progetto" forId="project-name" />
          <ui-input id="project-name" placeholder="angular-tailwind-ui-kit" />
          <ui-input-group prefix="@" suffix=".npm" placeholder="your-scope/ui-kit"></ui-input-group>
          <ui-label text="Descrizione" forId="description" />
          <ui-textarea id="description" [rows]="4" placeholder="Descrizione breve della libreria"></ui-textarea>
        </div>
        <div class="ui-card space-y-3">
          <h2 class="text-base font-semibold text-slate-900">Selection</h2>
          <ui-checkbox [checked]="darkMode" (checkedChange)="darkMode = $event" label="Abilita modalità dark"></ui-checkbox>
          <ui-switch [checked]="advancedEnabled" (checkedChange)="advancedEnabled = $event" label="Includi componenti avanzati"></ui-switch>
          <ui-radio-group legend="Dimensione default" [options]="sizes" [value]="selectedSize" (valueChange)="selectedSize = $event"></ui-radio-group>
          <p class="text-sm text-slate-500">Stato: dark={{ darkMode }}, advanced={{ advancedEnabled }}, size={{ selectedSize }}</p>
        </div>
      </div>
    </section>
  `,
})
export class ShowcaseFoundationPageComponent {
  darkMode = false;
  advancedEnabled = true;
  selectedSize = 'md';
  readonly sizes = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
}

@Component({
  selector: 'app-showcase-navigation-page',
  standalone: true,
  imports: [CommonModule, UiTabsComponent, UiBreadcrumbComponent, UiPaginationComponent, UiDropdownComponent],
  template: `
    <section class="space-y-4">
      <h1 class="text-2xl font-bold text-slate-900">Navigation</h1>
      <div class="ui-card space-y-4">
        <ui-breadcrumb [items]="breadcrumbs" />
        <ui-tabs [tabs]="tabs" [active]="activeTab" (activeChange)="activeTab = $event" />
        <div class="flex flex-wrap items-center justify-between gap-3">
          <ui-dropdown label="Azione">
            <button type="button" class="ui-menu-item">Duplica componente</button>
            <button type="button" class="ui-menu-item">Esporta tokens</button>
            <button type="button" class="ui-menu-item">Apri docs</button>
          </ui-dropdown>
          <ui-pagination [totalPages]="8" [page]="page" (pageChange)="page = $event" />
        </div>
      </div>
    </section>
  `,
})
export class ShowcaseNavigationPageComponent {
  activeTab = 'overview';
  page = 2;
  readonly breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Navigation' },
  ];
  readonly tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API' },
    { id: 'snippets', label: 'Snippets' },
  ];
}

@Component({
  selector: 'app-showcase-interactive-page',
  standalone: true,
  imports: [CommonModule, UiAccordionComponent, UiCollapsibleComponent, UiDialogComponent, UiAlertDialogComponent],
  template: `
    <section class="space-y-4">
      <h1 class="text-2xl font-bold text-slate-900">Interactive</h1>
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="ui-card space-y-3">
          <ui-accordion [items]="accordionItems" />
          <ui-collapsible collapsedLabel="Mostra dettagli" expandedLabel="Nascondi dettagli">
            Build pipeline, changelog e smoke test esterno.
          </ui-collapsible>
        </div>
        <div class="ui-card space-y-3">
          <button type="button" class="ui-button ui-button--primary" (click)="dialogOpen = true">Apri dialog</button>
          <button type="button" class="ui-button ui-button--danger" (click)="alertDialogOpen = true">Apri alert dialog</button>
          <ui-dialog [isOpen]="dialogOpen" title="Nuova release" (close)="dialogOpen = false" (confirm)="dialogOpen = false">
            <p class="text-sm text-slate-600">Conferma pubblicazione della versione 0.1.0.</p>
          </ui-dialog>
          <ui-alert-dialog [isOpen]="alertDialogOpen" title="Eliminare branch?" message="Questa operazione non può essere annullata." (close)="alertDialogOpen = false" (confirm)="alertDialogOpen = false"></ui-alert-dialog>
        </div>
      </div>
    </section>
  `,
})
export class ShowcaseInteractivePageComponent {
  dialogOpen = false;
  alertDialogOpen = false;
  readonly accordionItems = [
    { title: 'A11y baseline', content: 'Ruoli ARIA, tastiera e gestione focus su overlay.' },
    { title: 'Design tokens', content: 'Palette e radius centralizzati via CSS variables.' },
    { title: 'Testing', content: 'Unit test su varianti e smoke test di build/serve.' },
  ];
}

@Component({
  selector: 'app-showcase-advanced-page',
  standalone: true,
  imports: [CommonModule, UiComboboxComponent, UiSelectSearchComponent, UiTypeaheadComponent, UiDatepickerComponent],
  template: `
    <section class="space-y-4">
      <h1 class="text-2xl font-bold text-slate-900">Advanced Inputs</h1>
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="ui-card space-y-3">
          <ui-combobox label="Framework" [items]="frameworks" [value]="framework" (valueChange)="framework = $event" />
          <ui-select-search label="Ruolo" [items]="roles" [value]="role" (valueChange)="role = $event" />
          <ui-typeahead label="Dipendenza" [items]="dependencies" [value]="dependency" (valueChange)="dependency = $event" />
          <ui-datepicker label="Release date" [value]="releaseDate" (valueChange)="releaseDate = $event" />
        </div>
        <div class="ui-card space-y-2">
          <h2 class="text-base font-semibold text-slate-900">Output modello</h2>
          <p class="text-sm text-slate-600">framework={{ framework }}</p>
          <p class="text-sm text-slate-600">role={{ role }}</p>
          <p class="text-sm text-slate-600">dependency={{ dependency }}</p>
          <p class="text-sm text-slate-600">releaseDate={{ releaseDate || '-' }}</p>
        </div>
      </div>
    </section>
  `,
})
export class ShowcaseAdvancedPageComponent {
  framework = '';
  role = '';
  dependency = '';
  releaseDate = '';

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
    { value: 'ng-packagr', label: 'ng-packagr' },
  ];
}
