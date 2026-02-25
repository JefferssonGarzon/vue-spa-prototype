import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('<PokemonPage>', () => {
  const wrapper = mount(PokemonPage, {
    props: {
      id: 25,
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  test('should be render the component correctly', () => {
    expect(wrapper.find('h1').exists()).toBe(true);

    expect(wrapper.find('img').attributes('src')).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wrapper.props().id}.svg`,
    );

    const link = wrapper.findComponent(RouterLinkStub);

    expect(link.props().to).toEqual({ name: 'pokemon', params: { id: wrapper.props().id + 1 } });
  });
});
