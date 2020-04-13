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

afterEach(cleanup);

describe('FiltersList tests', () => {
  test('if filtering after removea a filter', async () => {
    const { queryByText, queryByTestId } = await testTableRender();

    const selectComparison = queryByTestId(/select-comparison/i);
    const selectColumn = queryByTestId(/select-column/i);
    const inputValue = queryByTestId(/inputNumberValue/i);

    fireEvent.change(selectComparison, { target: { value: 'maior que' } });
    fireEvent.change(selectColumn, { target: { value: 'rotation_period' } });
    Simulate.change(inputValue, { target: { value: '24' } });

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

    fireEvent.click(queryByTestId(/remove-button-rotation_period/i));

    planets.forEach((planet) => {
      expect(queryByText(planet.name)).toBeInTheDocument();
    });

    expect(queryByText(/Clique para filtrar/i)).toBeNull();
  });
});
