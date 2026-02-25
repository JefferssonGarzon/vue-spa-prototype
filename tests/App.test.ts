import App from '@/App.vue';
import { router } from '@/router';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('<App>', () => {
  test('should be render correctly with RouterView', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
      },
    });

    const routerView = wrapper.findComponent({ name: 'RouterView' });

    expect(routerView.exists()).toBe(true);
  });
});
