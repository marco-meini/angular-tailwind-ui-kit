export interface ShowcaseCatalogItem {
  id: string;
  label: string;
}

export const SHOWCASE_CATALOG: ShowcaseCatalogItem[] = [
  { id: 'ui-accordion', label: 'UiAccordionComponent' },
  { id: 'ui-accordion-item', label: 'UiAccordionItemComponent' },
  { id: 'ui-advanced-demo-state', label: 'UiAdvancedDemoStateComponent' },
  { id: 'ui-alert', label: 'UiAlertComponent' },
  { id: 'ui-alert-dialog', label: 'UiAlertDialogComponent' },
  { id: 'ui-badge', label: 'UiBadgeComponent' },
  { id: 'ui-breadcrumb', label: 'UiBreadcrumbComponent' },
  { id: 'ui-checkbox', label: 'UiCheckboxComponent' },
  { id: 'ui-collapsible', label: 'UiCollapsibleComponent' },
  { id: 'ui-combobox', label: 'UiComboboxComponent' },
  { id: 'ui-datepicker', label: 'UiDatepickerComponent' },
  { id: 'ui-dialog', label: 'UiDialogComponent' },
  { id: 'ui-dropdown', label: 'UiDropdownComponent' },
  { id: 'ui-input', label: 'UiInputComponent' },
  { id: 'ui-input-group', label: 'UiInputGroupComponent' },
  { id: 'ui-label', label: 'UiLabelComponent' },
  { id: 'ui-pagination', label: 'UiPaginationComponent' },
  { id: 'ui-progress', label: 'UiProgressComponent' },
  { id: 'ui-radio-group', label: 'UiRadioGroupComponent' },
  { id: 'ui-select-search', label: 'UiSelectSearchComponent' },
  { id: 'ui-spinner', label: 'UiSpinnerComponent' },
  { id: 'ui-switch', label: 'UiSwitchComponent' },
  { id: 'ui-tabs', label: 'UiTabsComponent' },
  { id: 'ui-textarea', label: 'UiTextareaComponent' },
  { id: 'ui-typeahead', label: 'UiTypeaheadComponent' },
];

export const SHOWCASE_DEFAULT_COMPONENT_ID = SHOWCASE_CATALOG[0]?.id ?? 'ui-badge';
