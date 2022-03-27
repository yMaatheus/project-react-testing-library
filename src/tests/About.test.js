import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a pagina About', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });
  test('O titulo foi carregado.', async () => {
    const aboutTitle = await screen.findByRole('heading',
      { name: /About Pokédex/i, level: 2 });

    expect(aboutTitle).toBeInTheDocument();
  });
  test('Há dois parágrafos na página.', async () => {
    // ref: https://testing-library.com/docs/queries/about/#textmatch
    const paragraphs = screen.getAllByText(
      (_content, element) => element.tagName.toLowerCase() === 'p',
    );
    expect(paragraphs).toHaveLength(2);
  });
  test('A imagem existe e está correta.', async () => {
    const img = screen.getByAltText(/Pokédex/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
