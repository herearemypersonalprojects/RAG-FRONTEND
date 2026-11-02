import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat',
  },

  {
    path: 'chat',
    title: 'AI Chat - RAG Assistant',
    loadComponent: () => import('./pages/chat/chat').then((m) => m.ChatPage),
  },

  {
    path: 'documents',
    title: 'Documents - RAG Assistant',
    loadComponent: () => import('./pages/documents/documents').then((m) => m.DocumentsPage),
  },

  {
    path: 'documents/:id',
    title: 'Document Details - RAG Assistant',
    loadComponent: () => import('./pages/documents/documents').then((m) => m.DocumentsPage),
  },

  {
    path: 'settings',
    title: 'Settings - RAG Assistant',
    loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsPage),
  },

  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
