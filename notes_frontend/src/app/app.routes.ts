import { Routes } from '@angular/router';

// Eagerly load NotesPageComponent for the root path
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./notes/notes-page/notes-page.component').then(m => m.NotesPageComponent)
  }
];
