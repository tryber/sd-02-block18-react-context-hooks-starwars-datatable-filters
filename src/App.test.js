import React from 'react';
import {
  render, cleanup, fireEvent, waitForDomChange,
} from '@testing-library/react';
import SWProvider from './context/SWProvider';
import App from './App';

afterEach(cleanup);

test('Renderiza o texto Loading ao iniciar a página', () => {
  const { getByText, queryByText } = render(
    <SWProvider>
      <App />
    </SWProvider>,
  );
  expect(getByText(/Loading.../i)).toBeDefined();
  const name = queryByText('Name');
  expect(name).toBeNull();
});

describe('Testes de quando a página renderiza pós loading', () => {
  it('Renderiza a página sem o texto loading', async () => {
    const { queryByText } = render(
      <SWProvider>
        <App />
      </SWProvider>,
    );
    await waitForDomChange();

    const loading = queryByText(/loading.../i);
    expect(loading).toBeNull();
    const name = queryByText('Name');
    expect(name).toBeInTheDocument();
  });
  it('Renderiza a tabela com as colunas', async () => {
    const { queryByText, getByText } = render(
      <SWProvider>
        <App />
      </SWProvider>,
    );
    await waitForDomChange();

    const loadingText = queryByText(/loading.../i);
    expect(loadingText).toBeNull();

    const nameColumn = getByText('Name');
    expect(nameColumn).toBeInTheDocument();

    const climateColumn = getByText('Climate');
    expect(climateColumn).toBeInTheDocument();

    const surfaceWaterColumn = queryByText('Surface Water');
    expect(surfaceWaterColumn).toBeInTheDocument();

    const filmsColumn = getByText('Films');
    expect(filmsColumn).toBeInTheDocument();

    const urlColumn = getByText('URL');
    expect(urlColumn).toBeInTheDocument();
  });
  it('Renderiza dados recebidos pela API de Star Wars', async () => {
    const { getByText } = render(
      <SWProvider>
        <App />
      </SWProvider>,
    );
    await waitForDomChange();

    const planetCoruscant = getByText('Coruscant');
    expect(planetCoruscant).toBeInTheDocument();

    const nabooPopulation = getByText('4500000000');
    expect(nabooPopulation).toBeInTheDocument();
  });
});

describe('Testa os filtros', () => {
  it('Testa o filtro de input por nome', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <SWProvider>
        <App />
      </SWProvider>,
    );
    await waitForDomChange();

    const nameInputFilter = getByTestId('name-input-filter');
    expect(nameInputFilter).toBeInTheDocument();

    fireEvent.change(nameInputFilter, { target: { value: 'oo' } });
    const tatooinePlanet = getByText('Tatooine');
    expect(tatooinePlanet).toBeInTheDocument();

    const alderaanPlanet = queryByText('Alderaan');
    expect(alderaanPlanet).toBeNull();
  });
  it('Testa filtros numéricos', async () => {
    const { getByTestId, getByText } = render(
      <SWProvider>
        <App />
      </SWProvider>,
    );
    await waitForDomChange();
    const insertedColumn = getByTestId(/column-inserted/i);
    const insertedComparison = getByTestId(/comparison-inserted/i);
    const insertedValue = getByTestId(/value-inserted/i);
    const endorPlanet = getByText(/endor/i);
    const btnFiltrar = getByTestId(/botao-filtrar/i);
    expect(endorPlanet).toBeInTheDocument();
    fireEvent.change(insertedColumn, { target: { value: 'diameter' } });
    fireEvent.change(insertedComparison, { target: { value: 'Maior que' } });
    fireEvent.change(insertedValue, { target: { value: 8000 } });

    fireEvent.click(btnFiltrar);
    expect(endorPlanet).not.toBeInTheDocument();

  });
  it('Testa funcionamento de botão de remover filtro', async () => {
    const { getByTestId, getByText } = render(
      <SWProvider>
        <App />
      </SWProvider>,
    );
    await waitForDomChange();

  });
});

test('Ordena as colunas', async () => {
  const { getByTestId, getAllByTestId } = render(
    <SWProvider>
      <App />
    </SWProvider>,
  );
  await waitForDomChange();

  const columnSorting = getByTestId('column-sorting');
  expect(columnSorting).toBeInTheDocument();

  fireEvent.change(columnSorting, { target: { value: 'name' } });

  const orderSorting = getByTestId('order-sorting');
  expect(orderSorting).toBeInTheDocument();

  fireEvent.change(orderSorting, { target: { value: 'DESC' } });

  let allPlanets = getAllByTestId('planets');
  expect(allPlanets.length).toBe(10);

  expect(allPlanets[0].innerHTML).toBe('Yavin IV');
  expect(allPlanets[9].innerHTML).toBe('Alderaan');

  fireEvent.change(columnSorting, { target: { value: 'orbital_period' } });

  allPlanets = getAllByTestId('planets');
  expect(allPlanets.length).toBe(10);

  expect(allPlanets[0].innerHTML).toBe('Bespin');
  expect(allPlanets[9].innerHTML).toBe('Tatooine');
});
