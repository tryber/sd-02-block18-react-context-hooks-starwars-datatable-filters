import React from 'react';
import {
  render, cleanup, waitForElementToBeRemoved,
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
    Simulate.change(queryByTestId(/input-name/i), event);
    expect(queryByTestId(/input-name/i).value).toBe('AA');
  });
  test('if filtering planets by name', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    Simulate.change(queryByTestId(/input-name/i), event);
    expect(queryByTestId(/input-name/i).value).toBe('AA');
    const notFilterPlanets = planets.filter((planet) => !planet.name.match(new RegExp(event.target.value, 'i')));
    const FilterPlanets = planets.filter((planet) => planet.name.match(new RegExp(event.target.value, 'i')));

    notFilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeNull();
    });
    FilterPlanets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeInTheDocument();
    });
  });
});
