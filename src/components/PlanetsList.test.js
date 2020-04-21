import React from 'react';
import {
  render, cleanup, waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Provider from '../contexts/Provider';
import Table from './Table';
import { SW_BASE_API } from '../services/SWapi';
import mockFetchPromise, { planets } from '../__mocks__/apiMock';

const testTableRender = async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const { queryByTestId, queryByText, getByRole } = render(
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

describe('PlanetsList tests', () => {
  test('if exist a table', async () => {
    const { getByRole } = await testTableRender();

    expect(getByRole('table')).toBeInTheDocument();
  });
  test('if exist a table thead', async () => {
    const { queryByTestId } = await testTableRender();

    Object.keys(planets[0]).forEach((key) => {
      expect(queryByTestId(`th-${key}`)).toBeInTheDocument();
      expect(queryByTestId(`th-${key}`).tagName).toBe('TH');
    });
  });
  test('if exist a table tbody', async () => {
    const { queryByText } = await testTableRender();

    planets.map((planet) => Object.values(planet).forEach((value, index) => {
      if (index === 9) {
        expect(queryByText(new RegExp(value[0] || value, 'i'))).toBeInTheDocument();
      } else {
        expect(queryByText(value)).toBeInTheDocument();
      }
    }));
  });
});
