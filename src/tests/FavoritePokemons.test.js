import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando pagina de Pokemons Favoritos.', () => {
  const PAGE_FAVORITES = '/favorites';
  test('Mostra o titulo "Favorite pokémons".', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PAGE_FAVORITES);

    const favoritePokemonsTitle = await screen.findByRole('heading',
      { name: /Favorite pokémons/i, level: 2 });
    expect(favoritePokemonsTitle).toBeInTheDocument();
  });

  test('Mostra "No favorite pokemon found" caso não haja pokemon favorito.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PAGE_FAVORITES);

    const noFavoritePokemonFound = await screen.findByText(/No favorite pokemon found/i);
    expect(noFavoritePokemonFound).toBeInTheDocument();
  });

  test('Mostra cards de pokemons favoritos', async () => {
    const { history } = renderWithRouter(<App />);

    // Pokemon 1 - Pikachu
    history.push('/pokemons/25');
    userEvent.click(screen.getByLabelText(/Pokémon favoritado?/i));

    // Pokemon 2 - Charmander
    history.push('/pokemons/4');
    userEvent.click(screen.getByLabelText(/Pokémon favoritado?/i));

    // Pokemon 3 - Snorlax
    history.push('/pokemons/143');
    userEvent.click(screen.getByLabelText(/Pokémon favoritado?/i));

    history.push(PAGE_FAVORITES);

    const noFavoritePokemonFound = screen.queryByText(/No favorite pokemon found/i);
    expect(noFavoritePokemonFound).not.toBeInTheDocument();

    const favoritePokemons = screen.getAllByTestId('pokemon-name');
    const THREE = 3;

    expect(favoritePokemons).toHaveLength(THREE);
    expect(favoritePokemons[0]).toHaveTextContent('Pikachu');
    expect(favoritePokemons[1]).toHaveTextContent('Charmander');
    expect(favoritePokemons[2]).toHaveTextContent('Snorlax');
  });
});
