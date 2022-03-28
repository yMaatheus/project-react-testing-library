import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente Pokemon', () => {
  let history;
  const URL_POKEMON_DETAILS = '/pokemons/25';
  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });
  test('As informações do card do Pokémon estão corretas.', async () => {
    const pokemonName = await screen.findByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = await screen.findByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = await screen.findByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const img = await screen.findByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Contém um link de navegação funcional.', async () => {
    const moreDetails = await screen.findByRole('link', { name: /More details/i });

    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', URL_POKEMON_DETAILS);

    userEvent.click(moreDetails);

    const attr = { name: /Pikachu Details/i, level: 2 };
    const pokemonDetailsTitle = await screen.findByRole('heading', attr);

    expect(pokemonDetailsTitle).toBeInTheDocument();

    expect(history.location.pathname).toBe(URL_POKEMON_DETAILS);
  });
  test('Existe um ícone de estrela nos Pokémons favoritados.', async () => {
    history.push(URL_POKEMON_DETAILS);
    userEvent.click(screen.getByLabelText(/Pokémon favoritado?/i));
    history.push('/');

    const favoriteIcon = await screen.findByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
