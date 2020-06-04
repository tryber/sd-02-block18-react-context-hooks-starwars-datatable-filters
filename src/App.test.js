import React from 'react';
import {
  render, waitForDomChange, fireEvent, cleanup,
} from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders all filters inputs', () => {
  const { getByPlaceholderText } = render(<App />);
  const nameFilterInput = getByPlaceholderText(/Filtrar pelo Nome/i);
  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;

  expect(nameFilterInput).toBeInTheDocument();
  expect(columnFilterInput).toBeInTheDocument();
  expect(comparisonFilterInput).toBeInTheDocument();
  expect(valueFilterInput).toBeInTheDocument();
});

test('render all table header titles', () => {
  const { getByText } = render(<App />);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  const tableTitles = tableBody.firstChild;
  expect(tableTitles.childElementCount).toBe(13);
});

test('render loading text while planets loads', async () => {
  const { getByText } = render(<App />);
  const loading = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).previousSibling;
  expect(loading).toBeInTheDocument();
  await waitForDomChange();
  expect(loading).not.toBeInTheDocument();
});

test('render all planets', async () => {
  const { getByText } = render(<App />);
  await waitForDomChange();
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);
});

test('render filtered planets according to name filter', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  await waitForDomChange();

  const nameFilterInput = getByPlaceholderText(/Filtrar pelo Nome/i);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);
  fireEvent.change(nameFilterInput, { target: { value: 'Alderaan' } });
  expect(tableBody.childElementCount).toBe(2);
  fireEvent.change(nameFilterInput, { target: { value: 'teste' } });
  expect(tableBody.childElementCount).toBe(1);
  fireEvent.change(nameFilterInput, { target: { value: 'E' } });
  expect(tableBody.childElementCount).toBe(5);
  fireEvent.change(nameFilterInput, { target: { value: '' } });
  expect(tableBody.childElementCount).toBe(11);
});

test('render filtered planets according to numeric filters', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  await waitForDomChange();

  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  fireEvent.change(columnFilterInput, { target: { value: 'population' } });
  fireEvent.change(comparisonFilterInput, { target: { value: 'bigger' } });
  fireEvent.change(valueFilterInput, { target: { value: 1000 } });
  expect(columnFilterInput.value).toBe('population');
  expect(comparisonFilterInput.value).toBe('bigger');
  expect(valueFilterInput.value).toBe('1000');

  const addFilterBtn = valueFilterInput.nextSibling;
  fireEvent.click(addFilterBtn);
  expect(tableBody.childElementCount).toBe(8);

  fireEvent.change(columnFilterInput, { target: { value: 'surface_water' } });
  fireEvent.change(comparisonFilterInput, { target: { value: 'less' } });
  fireEvent.change(valueFilterInput, { target: { value: 10 } });
  expect(columnFilterInput.value).toBe('surface_water');
  expect(comparisonFilterInput.value).toBe('less');
  expect(valueFilterInput.value).toBe('10');

  fireEvent.click(valueFilterInput.nextSibling);
  expect(tableBody.childElementCount).toBe(4);
});

test('shows the actives numeric filters', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  await waitForDomChange();

  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  fireEvent.change(columnFilterInput, { target: { value: 'diameter' } });
  fireEvent.change(comparisonFilterInput, { target: { value: 'equal' } });
  fireEvent.change(valueFilterInput, { target: { value: 12500 } });
  expect(columnFilterInput.value).toBe('diameter');
  expect(comparisonFilterInput.value).toBe('equal');
  expect(valueFilterInput.value).toBe('12500');

  const addFilterBtn = valueFilterInput.nextSibling;
  fireEvent.click(addFilterBtn);
  expect(tableBody.childElementCount).toBe(2);

  const activeFilters = getByText(/Filtros Ativos/i).parentElement;
  expect(activeFilters.childElementCount).toBe(2);
});

test('remove active filter when clicks `X` button', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  await waitForDomChange();

  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  fireEvent.click(columnFilterInput);
  fireEvent.change(columnFilterInput, { target: { value: 'orbital_period' } });
  fireEvent.click(comparisonFilterInput);
  fireEvent.change(comparisonFilterInput, { target: { value: 'less' } });
  fireEvent.change(valueFilterInput, { target: { value: 400 } });
  expect(columnFilterInput.value).toBe('orbital_period');
  expect(comparisonFilterInput.value).toBe('less');
  expect(valueFilterInput.value).toBe('400');

  const addFilterBtn = valueFilterInput.nextSibling;
  fireEvent.click(addFilterBtn);
  expect(tableBody.childElementCount).toBe(6);

  const activeFilters = getByText(/Filtros Ativos/i).parentElement;
  expect(activeFilters.childElementCount).toBe(2);

  const filter = getByText(/Filtros Ativos/i).nextSibling;
  const removeFilterBtn = filter.lastChild;
  fireEvent.click(removeFilterBtn);
  expect(activeFilters.childElementCount).toBe(1);
  expect(tableBody.childElementCount).toBe(11);
});

test('order column when clicks the column title', async () => {
  const { getByText } = render(<App />);
  await waitForDomChange();

  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  const columnTitles = tableBody.firstChild;
  // name
  expect(tableBody.children[1].firstChild.textContent).toBe('Alderaan');
  fireEvent.click(columnTitles.firstChild.firstChild);
  expect(tableBody.children[1].firstChild.textContent).toBe('Yavin IV');
  fireEvent.click(columnTitles.firstChild.firstChild);
  expect(tableBody.children[1].firstChild.textContent).toBe('Alderaan');
});

test('alternately orders asc and desc when clicks on the same column title', async () => {
  const { getByText } = render(<App />);
  await waitForDomChange();

  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  const columnTitles = tableBody.firstChild;
  // population
  expect(tableBody.children[1].children[1].textContent).toBe('2000000000');
  fireEvent.click(columnTitles.children[1].firstChild);
  expect(tableBody.children[1].children[1].textContent).toBe('1000');
  fireEvent.click(columnTitles.children[1].firstChild);
  expect(tableBody.children[1].children[1].textContent).toBe('unknown');

  // terrain
  expect(tableBody.children[1].children[6].textContent).toBe('tundra, ice caves, mountain ranges');
  fireEvent.click(columnTitles.children[6].firstChild);
  expect(tableBody.children[1].children[6].textContent).toBe('cityscape, mountains');

  // climate
  expect(tableBody.children[1].children[4].textContent).toBe('temperate');
  fireEvent.click(columnTitles.children[4].firstChild);
  expect(tableBody.children[1].children[4].textContent).toBe('arid');
  fireEvent.click(columnTitles.children[4].firstChild);
  expect(tableBody.children[1].children[4].textContent).toBe('temperate, tropical');
});
