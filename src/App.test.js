import React from 'react';
import {
  render, cleanup, waitForDomChange, fireEvent,
} from '@testing-library/react';
import {
  getPlanetsByNameSearch, getPlanetsByOneFilterLesser,
  getPlanetsByVariousFiltersBigger, getPlanetsByVariousFiltersEqual,
} from './services/mockFilters';
import App from './App';
import planetsMock from './services/mockPlanets';

afterEach(cleanup);

const mockPlanetsSuccess = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({
        results: [...planetsMock],
      }),
    }));
};

test('renders learn react link', () => {
  mockPlanetsSuccess();
  const { getByText } = render(<App />);
  const title = getByText(/Pesquisar/i);
  expect(title).toBeInTheDocument();
});

test('Checking if the planets are rendered', async () => {
  mockPlanetsSuccess();
  const { getByTestId, getByText } = render(<App />);
  const loading = getByTestId('loading');
  expect(loading).toBeInTheDocument();
  await waitForDomChange();
  planetsMock.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
});

test('checking search by name', async () => {
  mockPlanetsSuccess();
  const { getByTestId, getByText, queryByText } = render(<App />);
  await waitForDomChange();
  const inputName = getByTestId('name-inp');
  fireEvent.change(inputName, { target: { value: 'h' } });
  const [pFilteredLetterH, notpFilteredLetterH] = getPlanetsByNameSearch('h');
  pFilteredLetterH.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
  notpFilteredLetterH.forEach(({ name }) => {
    expect(queryByText(name)).toBeNull();
  });
});

test('checking search by one filter', async () => {
  mockPlanetsSuccess();
  const { getByTestId, getByText, queryByText } = render(<App />);
  await waitForDomChange();
  const columnFilter = getByTestId('col');
  const comparison = getByTestId('comp');
  const comparisonValue = getByTestId('value-comp');
  const btnFilter = getByTestId('btn-filter');
  fireEvent.change(columnFilter, { target: { value: 'orbital_period' } });
  fireEvent.change(comparison, { target: { value: 'Menor que' } });
  fireEvent.change(comparisonValue, { target: { value: '350' } });
  fireEvent.click(btnFilter);
  const [pFiltered, notPFiltered] = getPlanetsByOneFilterLesser(planetsMock, 'orbital_period', 350);
  pFiltered.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
  notPFiltered.forEach(({ name }) => {
    expect(queryByText(name)).toBeNull();
  });
});

test('checking search by one filter and word', async () => {
  mockPlanetsSuccess();
  const { getByTestId, getByText, queryByText } = render(<App />);
  await waitForDomChange();
  const inputName = getByTestId('name-inp');
  const columnFilter = getByTestId('col');
  const comparison = getByTestId('comp');
  const comparisonValue = getByTestId('value-comp');
  const btnFilter = getByTestId('btn-filter');
  fireEvent.change(columnFilter, { target: { value: 'orbital_period' } });
  fireEvent.change(comparison, { target: { value: 'Menor que' } });
  fireEvent.change(comparisonValue, { target: { value: '350' } });
  fireEvent.click(btnFilter);
  fireEvent.change(inputName, { target: { value: 'b' } });
  const [pFilteredWord, notPFilteredWord] = getPlanetsByNameSearch('b');
  const [pFilteredLesser, notPFilteredLesser] = getPlanetsByOneFilterLesser(pFilteredWord, 'orbital_period', 350);
  const notFiltered = [...notPFilteredWord, ...notPFilteredLesser];
  pFilteredLesser.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
  notFiltered.forEach(({ name }) => {
    expect(queryByText(name)).toBeNull();
  });
});


test('checking multiple filters and deleting', async () => {
  mockPlanetsSuccess();
  const { getByTestId, getByText, queryByText } = render(<App />);
  await waitForDomChange();
  const inputName = getByTestId('name-inp');
  const columnFilter = getByTestId('col');
  const comparison = getByTestId('comp');
  const comparisonValue = getByTestId('value-comp');
  const btnFilter = getByTestId('btn-filter');
  fireEvent.change(inputName, { target: { value: 'a' } });
  const [pFiltered, notpFilteredWord] = getPlanetsByNameSearch('a');

  fireEvent.change(columnFilter, { target: { value: 'rotation_period' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '23' } });
  fireEvent.click(btnFilter);
  const [pFiltered1, notPFiltered1] = getPlanetsByVariousFiltersBigger(pFiltered, 'rotation_period', '23');

  fireEvent.change(columnFilter, { target: { value: 'orbital_period' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '312' } });
  fireEvent.click(btnFilter);
  const [pFiltered2, notPFiltered2] = getPlanetsByVariousFiltersBigger(pFiltered1, 'orbital_period', '312');

  fireEvent.change(columnFilter, { target: { value: 'population' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '1000' } });
  fireEvent.click(btnFilter);
  const [pFiltered3, notPFiltered3] = getPlanetsByVariousFiltersBigger(pFiltered2, 'population', '1000');

  fireEvent.change(columnFilter, { target: { value: 'diameter' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '12250' } });
  fireEvent.click(btnFilter);
  const [pFiltered4, notPFiltered4] = getPlanetsByVariousFiltersBigger(pFiltered3, 'diameter', '12250');

  fireEvent.change(columnFilter, { target: { value: 'surface_water' } });
  fireEvent.change(comparison, { target: { value: 'ou Igual a' } });
  fireEvent.change(comparisonValue, { target: { value: '100' } });
  fireEvent.click(btnFilter);
  const [pFiltered5, notPFiltered5] = getPlanetsByVariousFiltersEqual(pFiltered4, 'surface_water', '100');
  const notFiltered = [...notpFilteredWord, ...notPFiltered1,
    ...notPFiltered2, ...notPFiltered3, ...notPFiltered4, ...notPFiltered5];

  expect(getByText(pFiltered5[0].name)).toBeInTheDocument();
  notFiltered.forEach(({ name }) => {
    expect(queryByText(name)).toBeNull();
  });
  const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  columns.forEach((column) => {
    const btnDelete = getByTestId(`delete-${column}`);
    fireEvent.click(btnDelete);
  });

  fireEvent.change(inputName, { target: { value: '' } });
  planetsMock.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
});

test('check filter button not working', async () => {
  mockPlanetsSuccess();
  const { getByTestId } = render(<App />);
  await waitForDomChange();
  jest.spyOn(window, 'alert').mockImplementation(() => { });
  const btnFilter = getByTestId('btn-filter');
  fireEvent.click(btnFilter);
  expect(window.alert).toHaveBeenCalledTimes(1);
});

test('check equals to filter', async () => {
  mockPlanetsSuccess();
  const { getByTestId, getByText } = render(<App />);
  await waitForDomChange();
  const columnFilter = getByTestId('col');
  const comparison = getByTestId('comp');
  const comparisonValue = getByTestId('value-comp');
  const btnFilter = getByTestId('btn-filter');
  fireEvent.change(columnFilter, { target: { value: 'surface_water' } });
  fireEvent.change(comparison, { target: { value: 'ou Igual a' } });
  fireEvent.change(comparisonValue, { target: { value: '100' } });
  fireEvent.click(btnFilter);
  expect(getByText('Kamino')).toBeInTheDocument();
});
