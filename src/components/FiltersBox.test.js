import React from 'react';
import {
  render, cleanup, waitForElementToBeRemoved, fireEvent, wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Simulate } from 'react-dom/test-utils';

import Provider from '../contexts/Provider';
import Table from './Table';
import { SW_BASE_API } from '../services/SWapi';
import mockFetchPromise, { planets } from '../__mocks__/apiMock';

const testTableRender = async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const { queryByText, getByRole, queryByTestId } = render(
    <Provider>
      <Table />
    </Provider>,
  );

  expect(queryByText(/Loading/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => queryByText(/Loadin/i));

  expect(global.fetch).toHaveBeenCalledWith(`${SW_BASE_API}/planets`);

  expect(queryByText(/Loading/i)).toBeNull();

  return {
    queryByText,
    getByRole,
    queryByTestId,
  };
};

const event = {
  target: { value: 'AA' },
};

afterEach(cleanup);

describe('FiltersBox tests', () => {
  test('if exist a table', async () => {
    const { getByRole } = await testTableRender();

    expect(getByRole('table')).toBeInTheDocument();
  });
  test('if exist and can change inputByName', async () => {
    const { queryByTestId } = await testTableRender();

    expect(queryByTestId(/input-name/i)).toBeInTheDocument();
    expect(queryByTestId(/input-name/i).tagName).toBe('INPUT');
    fireEvent.change(queryByTestId(/input-name/i), event);
    expect(queryByTestId(/input-name/i).value).toBe('AA');
  });
  test('if filtering planets by name', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    fireEvent.change(queryByTestId(/input-name/i), event);
    expect(queryByTestId(/input-name/i).value).toBe('AA');

    const notFilterPlanets = planets.filter((planet) => !planet.name.match(new RegExp(event.target.value, 'i')));
    const FilterPlanets = planets.filter((planet) => planet.name.match(new RegExp(event.target.value, 'i')));

    notFilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).not.toBeInTheDocument();
    });
    FilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeInTheDocument();
    });
  });
  test('if exist filters by numeric value', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    const selectComparison = queryByTestId(/select-comparison/i);
    const selectColumn = queryByTestId(/select-column/i);
    const inputValue = queryByTestId(/inputNumberValue/i);

    expect(selectComparison).toBeInTheDocument();
    expect(queryByText(/Escolha uma coluna/i)).toBeInTheDocument();

    expect(selectColumn).toBeInTheDocument();
    expect(queryByText(/Escolha um comparador/i)).toBeInTheDocument();

    expect(inputValue).toBeInTheDocument();
    expect(inputValue.value).toBe('');

    expect(queryByText(/Clique para filtrar/i)).toBeNull();
  });
  test('if filtering planets by numeric value maior que', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    const selectComparison = queryByTestId(/select-comparison/i);
    const selectColumn = queryByTestId(/select-column/i);
    const inputValue = queryByTestId(/inputNumberValue/i);

    fireEvent.change(selectComparison, { target: { value: 'maior que' } });
    fireEvent.change(selectColumn, { target: { value: 'rotation_period' } });
    fireEvent.change(inputValue, { target: { value: '24' } });

    await wait();

    expect(queryByText(/maior que/i)).toBeInTheDocument();
    expect(queryByTestId(/select-column/i).value).toBe('rotation_period');
    expect(queryByTestId(/inputNumberValue/i).value).toBe('24');
    await wait(() => expect(queryByText(/Clique para filtrar/i)).toBeInTheDocument());

    fireEvent.click(queryByText(/Clique para filtrar/i));

    const notFilterPlanets = planets.filter((planet) => !(Number(planet.rotation_period) > 24));
    const FilterPlanets = planets.filter((planet) => Number(planet.rotation_period) > 24);

    notFilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).not.toBeInTheDocument();
    });
    FilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeInTheDocument();
    });

    await wait(() => expect(queryByText(/Filters List/i)).toBeInTheDocument());
    expect(queryByText('rotation_period|maior que|24')).toBeInTheDocument();
    expect(queryByTestId(/remove-button-rotation_period/i)).toBeInTheDocument();
    expect(queryByTestId(/remove-button-rotation_period/i).tagName).toBe('BUTTON');
  });
  test('if filtering planets by numeric value menor que', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    const selectComparison = queryByTestId(/select-comparison/i);
    const selectColumn = queryByTestId(/select-column/i);
    const inputValue = queryByTestId(/inputNumberValue/i);

    fireEvent.change(selectComparison, { target: { value: 'menor que' } });
    fireEvent.change(selectColumn, { target: { value: 'population' } });
    fireEvent.change(inputValue, { target: { value: '2000000' } });

    await wait();

    expect(queryByText(/menor que/i)).toBeInTheDocument();
    expect(queryByTestId(/select-column/i).value).toBe('population');
    expect(queryByTestId(/inputNumberValue/i).value).toBe('2000000');
    await wait(() => expect(queryByText(/Clique para filtrar/i)).toBeInTheDocument());

    fireEvent.click(queryByText(/Clique para filtrar/i));

    const notFilterPlanets = planets.filter((planet) => !(Number(planet.population) < 2000000));
    const FilterPlanets = planets.filter((planet) => Number(planet.population) < 2000000);

    notFilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).not.toBeInTheDocument();
    });
    FilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeInTheDocument();
    });

    await wait(() => expect(queryByText(/Filters List/i)).toBeInTheDocument());
    expect(queryByText('population|menor que|2000000')).toBeInTheDocument();
    expect(queryByTestId(/remove-button/i)).toBeInTheDocument();
    expect(queryByTestId(/remove-button/i).tagName).toBe('BUTTON');
  });
  test('if filtering planets by numeric value, igual a', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    const selectComparison = queryByTestId(/select-comparison/i);
    const selectColumn = queryByTestId(/select-column/i);
    const inputValue = queryByTestId(/inputNumberValue/i);

    fireEvent.change(selectComparison, { target: { value: 'igual a' } });
    fireEvent.change(selectColumn, { target: { value: 'orbital_period' } });
    fireEvent.change(inputValue, { target: { value: '100' } });

    await wait();

    expect(queryByText(/igual a/i)).toBeInTheDocument();
    expect(queryByTestId(/select-column/i).value).toBe('orbital_period');
    expect(queryByTestId(/inputNumberValue/i).value).toBe('100');
    await wait(() => expect(queryByText(/Clique para filtrar/i)).toBeInTheDocument());

    fireEvent.click(queryByText(/Clique para filtrar/i));

    const notFilterPlanets = planets.filter((planet) => !(Number(planet.orbital_period) === 100));
    const FilterPlanets = planets.filter((planet) => Number(planet.orbital_period) === 100);

    notFilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).not.toBeInTheDocument();
    });
    FilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeInTheDocument();
    });

    await wait(() => expect(queryByText(/Filters List/i)).toBeInTheDocument());
    expect(queryByText('orbital_period|igual a|100')).toBeInTheDocument();
    expect(queryByTestId(/remove-button/i)).toBeInTheDocument();
    expect(queryByTestId(/remove-button/i).tagName).toBe('BUTTON');
  });
});
