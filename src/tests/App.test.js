import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App.js', () => {
  test('Os links(Home, About e Favorites) existem e estão corretos.', async () => {
    const { history } = renderWithRouter(<App />);
    const links = await screen.findAllByRole('link');
    const home = links[0];
    const about = links[1];
    const favorite = links[2];

    expect(home).toHaveTextContent('Home');
    expect(home).toHaveAttribute('href', '/');

    expect(about).toHaveTextContent('About');
    expect(about).toHaveAttribute('href', '/about');

    expect(favorite).toHaveTextContent('Favorite Pokémons');
    expect(favorite).toHaveAttribute('href', '/favorites');

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/aleatório');
    const notFoundTitle = await screen.findByRole('heading',
      { name: /page requested not found/i, level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
