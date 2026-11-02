import { describe, expect, it } from 'vitest';

import { routes } from './app.routes';

describe('Application routes', () => {
  it('should redirect root to chat', () => {
    const root = routes.find((route) => route.path === '');

    expect(root?.redirectTo).toBe('chat');
    expect(root?.pathMatch).toBe('full');
  });

  it('should define the required pages', () => {
    const paths = routes.map((route) => route.path);

    expect(paths).toContain('chat');
    expect(paths).toContain('documents');
    expect(paths).toContain('documents/:id');
    expect(paths).toContain('settings');
  });

  it('should have wildcard as the last route', () => {
    expect(routes[routes.length - 1].path).toBe('**');
  });

  it('should lazy-load the chat page', () => {
    const chatRoute = routes.find((route) => route.path === 'chat');

    expect(chatRoute?.loadComponent).toBeDefined();
  });
});
