import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente NotFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/aleatório');
  });

  test('A pagina contém o titulo "Page requested not found"', async () => {
    const attr = { name: /page requested not found/i, level: 2 };
    const pageRequestNotFound = await screen.findByRole('heading', attr);
    expect(pageRequestNotFound).toBeInTheDocument();
  });

  test('A pagina contém a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', async () => {
    const alt = /Pikachu crying because the page requested was not found/i;
    const img = await screen.findByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
