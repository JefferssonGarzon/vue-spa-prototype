import App from '@/App.vue';
import { router } from '@/router';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import type { RouteLocationNormalizedGeneric } from 'vue-router';

describe('Router', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  test('renders HomePage when visiting /', async () => {
    await router.replace('/');
    await router.isReady();

    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('renders FeaturesPage when visiting /features', async () => {
    await router.replace('/features');
    await router.isReady();

    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');

    await router.replace('/');
    // Other way to change the path
    await router.push({ name: 'features' });

    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
  });

  test('renders PricingPage when visiting /pricing', async () => {
    await router.replace('/pricing');
    await router.isReady();

    expect(wrapper.html()).toContain('Choose a plan that works best for you and');
  });

  test('renders ContactPage when visiting /contact', async () => {
    await router.replace('/contact');
    await router.isReady();

    const iframe = wrapper.find('iframe');

    expect(wrapper.html()).toContain('iframe');
    expect(iframe.attributes('src')).toBe(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12144.018525996467!2d-3.7068288121521342!3d40.45303446107154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e23705d39f%3A0xa8fff6d26e2b1988!2zQmVybmFiw6l1!5e0!3m2!1ses!2sco!4v1771827174365!5m2!1ses!2sco',
    );
    expect(wrapper.html()).toContain(
      'Post-ironic portland shabby chic echo park, banjo fashion axe',
    );
  });

  test('renders LoginPage when visiting /pokemon/:id with no authentication', async () => {
    localStorage.clear();
    const id = 111;
    await router.replace(`/pokemon/${id}`);
    await router.isReady();

    expect(wrapper.html()).toContain('Login');
    expect(wrapper.find('h1').text()).toContain('Login');
  });

  test('renders LoginPage when visiting /pokemon/:id with authentication', async () => {
    localStorage.setItem('userId', 'JGA-77');
    const id = 111;
    await router.replace(`/pokemon/${id}`);
    await router.isReady();

    expect(wrapper.find('h1').text()).toContain(`Pokemon #${id}`);
    expect(wrapper.html()).toContain(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    );
  });

  test('should convert the segment into numbers', () => {
    const pokemonId = 9;
    const route: RouteLocationNormalizedGeneric = {
      name: undefined,
      matched: [],
      fullPath: `/pokemon/${pokemonId}`,
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '',
      params: { id: `${pokemonId}` },
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    expect(pokemonRoute).toBeTruthy();

    const { id } = pokemonRoute?.props
      ? (
          pokemonRoute.props as {
            default: (route: RouteLocationNormalizedGeneric) => { id: number };
          }
        ).default(route)
      : { id: 1 };

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(pokemonId);
  });

  test('should return a default value if argument is not a number', () => {
    const pokemonId = '77brrr';
    const route: RouteLocationNormalizedGeneric = {
      name: undefined,
      matched: [],
      fullPath: `/pokemon/${pokemonId}`,
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '',
      params: { id: `${pokemonId}` },
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    expect(pokemonRoute).toBeTruthy();

    const { id } = pokemonRoute?.props
      ? (
          pokemonRoute.props as {
            default: (route: RouteLocationNormalizedGeneric) => { id: number };
          }
        ).default(route)
      : { id: 1 };

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(1);
  });
});
