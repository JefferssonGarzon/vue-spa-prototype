import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

describe('is-authenticated.guard', () => {
  const to: RouteLocationNormalized = {
    name: undefined,
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/home-screen',
    params: {},
    meta: {},
  };

  const from: RouteLocationNormalizedLoaded = {
    matched: [],
    name: undefined,
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '',
    params: {},
    meta: {},
  };

  const next = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  test('should block if not authenticated', async () => {
    await isAuthenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith({ name: 'login' });
  });

  test('should called localStorage set item lastPath', async () => {
    await isAuthenticatedGuard(to, from, next);

    const lastPath = localStorage.getItem('last-path');

    expect(lastPath).toBe(to.path);
  });

  test('should block if not authenticated with spies', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await isAuthenticatedGuard(to, from, next);

    expect(setItem).toHaveBeenCalledWith('last-path', to.path);
  });

  test('should pass if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('JGA-7');

    await isAuthenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });
});
