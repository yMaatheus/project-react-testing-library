import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  test('As informações detalhadas do Pokémon são mostradas na tela.', async () => {
    const nameAttr = { name: /Pikachu Details/i, level: 2 };
    const nameDetails = await screen.findByRole('heading', nameAttr);

    expect(nameDetails).toBeInTheDocument();

    const moreDetails = screen.queryByRole('link', { name: /More details/i });
    expect(moreDetails).not.toBeInTheDocument();

    const summary = await screen.findByRole('heading', { name: /Summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const resume = await screen.findByText(/This intelligent Pokémon roasts hard/i);
    expect(resume).toBeInTheDocument();
  });
  test('Existe uma seção com mapas contendo as localizações do pokémon.', async () => {
    const attr = { name: /Game Locations of Pikachu/i, level: 2 };
    const gameLocationsTitle = await screen.findByRole('heading', attr);

    expect(gameLocationsTitle).toBeInTheDocument();

    const locations = await screen.findAllByAltText('Pikachu location');

    expect(locations).toHaveLength(2);

    expect(locations[0]).toBeInTheDocument();
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(locations[1]).toBeInTheDocument();
    expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const kantoViridianForest = await screen.findByText(/Kanto Viridian Forest/i);

    expect(kantoViridianForest).toBeInTheDocument();

    const kantoPowerPlant = await screen.findByText(/Kanto Power Plant/i);

    expect(kantoPowerPlant).toBeInTheDocument();
  });
  test('O usuário pode favoritar um pokémon.', async () => {
    let favoriteIcon = screen.queryByAltText('Pikachu is marked as favorite');

    expect(favoriteIcon).not.toBeInTheDocument();

    const favoriteLabel = await screen.findByLabelText(/Pokémon favoritado?/i);

    userEvent.click(favoriteLabel);

    favoriteIcon = screen.queryByAltText('Pikachu is marked as favorite');

    expect(favoriteIcon).toBeInTheDocument();
  });
});
