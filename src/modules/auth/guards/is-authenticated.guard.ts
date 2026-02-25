import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext,
) => {
  const userId = localStorage.getItem('userId');
  console.log(userId ?? 'No existe userId en localStorage');

  localStorage.setItem('last-path', to.path);

  if (!userId) {
    return next({
      name: 'login',
    });
  }

  return next();
};

export default isAuthenticatedGuard;
