import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Pokedex', () => {
  const POKEMON_NAME = 'pokemon-name';
  const NEXT_POKEMON = 'next-pokemon';
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('A pagina contém titulo h2 com o texto "Encountered pokémons".', async () => {
    const attr = { name: /Encountered pokémons/i, level: 2 };
    const title = await screen.findByRole('heading', attr);
    expect(title).toHaveTextContent('Encountered pokémons');
  });
  test('O próximo Pokémon é exibido quando clicar em "Próximo pokémon".', async () => {
    let pokemon = await screen.findByTestId(POKEMON_NAME);
    expect(pokemon).toHaveTextContent('Pikachu');

    const nextPokemon = await screen.findByTestId(NEXT_POKEMON);
    userEvent.click(nextPokemon);

    pokemon = await screen.findByTestId(POKEMON_NAME);
    expect(pokemon).toHaveTextContent('Charmander');
  });
  test('É mostrado apenas um Pokémon por vez.', async () => {
    const pokemons = await screen.findAllByTestId(POKEMON_NAME);
    expect(pokemons).toHaveLength(1);
  });
  test('Pokédex tem os botões de filtro e botão de resetar o filtro.', async () => {
    const buttons = await screen.findAllByTestId('pokemon-type-button');
    const fire = buttons.filter((element) => element.tagName.toLowerCase() === 'button'
    && element.textContent === 'Fire')[0];
    // const filterButtons = await screen.findAllByTestId('pokemon-type-button');
    // const fireButton = filterButtons[1];
    //
    // const buttons = await screen.findAllByText((content, element) => {
    //   if (element.tagName.toLowerCase() === 'button') {
    //     console.log(element.getAttribute('datatestid'));
    //   }
    //   return element.getAttribute('dataTestId') === 'pokemon-type-button';
    // });
    // console.log(buttons.length, buttons[0]);
    // const fire = await screen.findByText(
    //   (content, element) => element.tagName.toLowerCase() === 'button'
    //   //   && element.getAttribute('dataTestId') === 'pokemon-type-button'
    //       && content.toLowerCase() === 'fire',
    // );
    // // const filterButtons = await screen.findAllByTestId('pokemon-type-button');
    // // const fireFilterButton = screen.getByRole('button', { name: /fire/i });

    // // console.log(filterButtons[1]);
    userEvent.click(fire);

    let pokemon = await screen.findByTestId(POKEMON_NAME);
    let pokemonType = await screen.findByTestId('pokemon-type');
    expect(pokemon).toHaveTextContent('Charmander');
    expect(pokemonType).toHaveTextContent('Fire');

    const nextPokemon = await screen.findByTestId(NEXT_POKEMON);
    userEvent.click(nextPokemon);

    pokemon = await screen.findByTestId(POKEMON_NAME);
    pokemonType = await screen.findByTestId('pokemon-type');
    expect(pokemon).toHaveTextContent('Rapidash');
    expect(pokemonType).toHaveTextContent('Fire');

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    pokemon = await screen.findByTestId(POKEMON_NAME);
    expect(pokemon).toHaveTextContent('Pikachu');

    userEvent.click(await screen.findByTestId('next-pokemon'));

    pokemon = await screen.findByTestId(POKEMON_NAME);
    expect(pokemon).toHaveTextContent('Charmander');
  });
});
