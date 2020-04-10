import React from 'react';
import {
  render, cleanup, waitForDomChange, fireEvent,
} from '@testing-library/react';
import { getPlanetsByNameSearch, getPlanetsByOneFilterLesser, getPlanetsByVariousFiltersBigger, getPlanetsByVariousFiltersEqual } from './services/mockFilters';
// import planets from './services/mockPlanets';
import App from './App';
import planetsMock from './services/mockPlanets';

afterEach(cleanup);

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Pesquisar/i);
  expect(title).toBeInTheDocument();
});

test('Checking if the planets are rendered', async () => {
  const { getByTestId, getByText } = render(<App />);
  const loading = getByTestId('loading');
  expect(loading).toBeInTheDocument();
  await waitForDomChange();
  planetsMock.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
});

test('checking search by name', async () => {
  const { getByTestId, getByText } = render(<App />);
  await waitForDomChange();
  const inputName = getByTestId('name-inp');
  fireEvent.change(inputName, { target: { value: 'h' } });
  const planetsFilteredLetterH = getPlanetsByNameSearch('h');
  planetsFilteredLetterH.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
});

test('checking search by one filter and/or name', async () => {
  const { getByTestId, getByText } = render(<App />);
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
  let planetsFiltered = getPlanetsByOneFilterLesser('', 'orbital_period', 350);
  planetsFiltered.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
  fireEvent.change(inputName, { target: { value: 'b' } });
  planetsFiltered = getPlanetsByOneFilterLesser('b', 'orbital_period', 350);
  planetsFiltered.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
});

test('checking multiple filters and deleting', async () => {
  const { getByTestId, getByText } = render(<App />);
  await waitForDomChange();
  const inputName = getByTestId('name-inp');
  const columnFilter = getByTestId('col');
  const comparison = getByTestId('comp');
  const comparisonValue = getByTestId('value-comp');
  const btnFilter = getByTestId('btn-filter');
  fireEvent.change(inputName, { target: { value: 'a' } });
  let planetsTobeFiltered = getPlanetsByNameSearch('a');

  fireEvent.change(columnFilter, { target: { value: 'rotation_period' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '23' } });
  fireEvent.click(btnFilter);
  planetsTobeFiltered = getPlanetsByVariousFiltersBigger(planetsTobeFiltered, 'rotation_period', '23');

  fireEvent.change(columnFilter, { target: { value: 'orbital_period' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '312' } });
  fireEvent.click(btnFilter);
  planetsTobeFiltered = getPlanetsByVariousFiltersBigger(planetsTobeFiltered, 'orbital_period', '312');

  fireEvent.change(columnFilter, { target: { value: 'population' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '1000' } });
  fireEvent.click(btnFilter);
  planetsTobeFiltered = getPlanetsByVariousFiltersBigger(planetsTobeFiltered, 'population', '1000');

  fireEvent.change(columnFilter, { target: { value: 'diameter' } });
  fireEvent.change(comparison, { target: { value: 'Maior que' } });
  fireEvent.change(comparisonValue, { target: { value: '12250' } });
  fireEvent.click(btnFilter);
  planetsTobeFiltered = getPlanetsByVariousFiltersBigger(planetsTobeFiltered, 'diameter', '12250');

  fireEvent.change(columnFilter, { target: { value: 'surface_water' } });
  fireEvent.change(comparison, { target: { value: 'ou Igual a' } });
  fireEvent.change(comparisonValue, { target: { value: '100' } });
  fireEvent.click(btnFilter);
  planetsTobeFiltered = getPlanetsByVariousFiltersEqual(planetsTobeFiltered, 'surface_water', '100');
  console.log(planetsTobeFiltered[0].name);

  expect(getByText(planetsTobeFiltered[0].name)).toBeInTheDocument();
  console.log(planetsTobeFiltered);
  const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  columns.forEach((column) => {
    const btnDelete = getByTestId(`delete-${column}`);
    fireEvent.click(btnDelete);
  });

  planetsTobeFiltered = getPlanetsByNameSearch('a');
  planetsTobeFiltered.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
  });
});

test('check filter button not working', async () => {
  const { getByTestId } = render(<App />);
  await waitForDomChange();
  jest.spyOn(window, 'alert').mockImplementation(() => { });
  const btnFilter = getByTestId('btn-filter');
  fireEvent.click(btnFilter);
  expect(window.alert).toHaveBeenCalledTimes(1);
});

test('check equals to filter', async () => {
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
