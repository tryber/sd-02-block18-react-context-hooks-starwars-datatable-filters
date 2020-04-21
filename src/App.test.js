import React from 'react';
import { render, waitForDomChange, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import { ProviderContext } from './context/Provider';

afterEach(cleanup);

test('renders the title', () => {
  const { getByText } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  const title = getByText(/starwars datatable with filters/i);
  expect(title).toBeInTheDocument();
});

test('renders the loading page', () => {
  const { getByText, queryByText } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  const loading = getByText(/loading.../i);
  expect(loading).toBeInTheDocument();

  const name = queryByText('Name');
  expect(name).toBeNull();
});

test('after loading, renders the table and filters', async () => {
  const { queryByText, getByText, getAllByText } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  await waitForDomChange();

  const loading = queryByText(/loading.../i);
  expect(loading).toBeNull();

  const climate = getByText('Climate');
  expect(climate).toBeInTheDocument;

  const diameters = getAllByText('Diameter');
  expect(diameters.length).toBe(3)

  const populations = getAllByText('Population');
  expect(populations.length).toBe(3)

  const names = getAllByText('Name');
  expect(names.length).toBe(2);

  const alderaan = getByText('Alderaan');
  expect(alderaan).toBeInTheDocument();

  const yavinIV = getByText('Yavin IV');
  expect(yavinIV).toBeInTheDocument;
});

test('filtra por nome', async () => {
  const { getByTestId, queryByText, getByText } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  await waitForDomChange();

  const nameFilterInput = getByTestId('name-filter-input');
  expect(nameFilterInput).toBeInTheDocument();

  fireEvent.change(nameFilterInput, { target: { value: 'aa' } });

  const alderaan = getByText('Alderaan');
  expect(alderaan).toBeInTheDocument;

  const kamino = queryByText('Kamino');
  expect(kamino).toBeNull();
});

test('filtra por valores numéricos e renderiza o próximo filtro', async () => {
  const { getByTestId, queryByTestId, queryByText, queryAllByTestId } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  await waitForDomChange();

  const columnFilter1 = getByTestId('1-column-filter');
  expect(columnFilter1).toBeInTheDocument();

  fireEvent.change(columnFilter1, { target: { value: 'population' } });

  let columnFilter2 = queryByTestId('2-column-filter');
  expect(columnFilter2).toBeNull();

  const valueFilter1 = getByTestId('1-value-filter');
  expect(valueFilter1).toBeInTheDocument();

  fireEvent.change(valueFilter1, { target: { value: '1000' } });

  columnFilter2 = queryByTestId('2-column-filter');
  expect(columnFilter2).toBeInTheDocument();

  let alderaan = queryByText('Alderaan');
  expect(alderaan).toBeInTheDocument();

  let yavinIV = queryByText('Yavin IV');
  expect(yavinIV).toBeNull();

  const comparisonFilter1 = getByTestId('1-comparison-filter');
  expect(comparisonFilter1).toBeInTheDocument();

  fireEvent.change(comparisonFilter1, { target: { value: '===' } });

  alderaan = queryByText('Alderaan');
  expect(alderaan).toBeNull();

  yavinIV = queryByText('Yavin IV');
  expect(yavinIV).toBeInTheDocument();

  fireEvent.change(comparisonFilter1, { target: { value: '<' } });

  alderaan = queryByText('Alderaan');
  expect(alderaan).toBeNull();

  yavinIV = queryByText('Yavin IV');
  expect(yavinIV).toBeNull();

  const planetas = queryAllByTestId('coluna-1');
  expect(planetas.length).toBe(0);
});

test('botão de apagar filtro funciona conforme o esperado', async () => {
  const { getByTestId, queryByText, getAllByTestId, getAllByText } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  await waitForDomChange();

  const columnFilter1 = getByTestId('1-column-filter');
  fireEvent.change(columnFilter1, { target: { value: 'population' } });

  const comparisonFilter1 = getByTestId('1-comparison-filter');
  fireEvent.change(comparisonFilter1, { target: { value: '===' } });

  const valueFilter1 = getByTestId('1-value-filter');
  fireEvent.change(valueFilter1, { target: { value: '1000' } });

  const buttonX1 = getAllByText(/x/i)[0];
  expect(buttonX1).toBeInTheDocument();

  fireEvent.click(buttonX1);

  const filters = getAllByTestId('filter');
  expect(filters.length).toBe(1);

  const alderaan = queryByText('Alderaan');
  expect(alderaan).toBeInTheDocument();
});

test('ordena colunas', async () => {
  const { getByTestId, getAllByTestId } = render(
    <ProviderContext>
      <App />
    </ProviderContext>
  );

  await waitForDomChange();

  const columnSorting = getByTestId('column-sorting');
  expect(columnSorting).toBeInTheDocument();

  fireEvent.change(columnSorting, { target: { value: 'name' } });

  const orderSorting = getByTestId('order-sorting');
  expect(orderSorting).toBeInTheDocument;

  fireEvent.change(orderSorting, { target: { value: 'DESC' } });

  let planetas = getAllByTestId('coluna-1');
  expect(planetas.length).toBe(10);

  expect(planetas[0].innerHTML).toBe('Yavin IV');
  expect(planetas[9].innerHTML).toBe('Alderaan');

  fireEvent.change(columnSorting, { target: { value: 'orbital_period' } });

  planetas = getAllByTestId('coluna-1');
  expect(planetas.length).toBe(10);

  expect(planetas[0].innerHTML).toBe('Bespin');
  expect(planetas[9].innerHTML).toBe('Tatooine');
});
