import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly navItems = [
    { path: '/', label: 'Overview' },
    { path: '/foundation', label: 'Foundation' },
    { path: '/navigation', label: 'Navigation' },
    { path: '/interactive', label: 'Interactive' },
    { path: '/advanced', label: 'Advanced' },
  ];
}
