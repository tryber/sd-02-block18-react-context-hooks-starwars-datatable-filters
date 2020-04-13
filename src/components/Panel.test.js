import React from 'react';
import {
  render, cleanup, wait, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Panel from './Panel';
import Provider from '../context/Provider';
import data from './data';

afterEach(cleanup);

const tableRender = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({
        results: [...data],
      }),
    }));

  const { getByTestId, getByText, queryByText, getAllByTestId } = render(
    <Provider>
      <Panel />
    </Provider>,
  );

  await wait();
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.co/api/planets/');

  return {
    getByTestId,
    getByText,
    queryByText,
    getAllByTestId,
  };
};

describe('Panel', () => {
  test('Panel render', async () => {
    const { getByTestId, getByText } = await tableRender();
    const table = getByTestId('table');
    expect(table).toBeInTheDocument();
    const thead = table.querySelector('thead');
    const tds = thead.querySelectorAll('td');

    expect(tds[0].innerHTML).toBe('name');
    expect(tds[1].innerHTML).toBe('rotation_period');
    expect(getByText(/Alderaan/)).toBeInTheDocument();
    expect(getByText(/364/)).toBeInTheDocument();
  });

  test('Filters', async () => {
    const { getByTestId, getAllByTestId, queryByText } = await tableRender();
    const filters = getByTestId('filters');
    expect(filters).toBeInTheDocument();

    const inputName = getByTestId('inputName');
    fireEvent.change(inputName, { target: { value: 'Alderaan' } });
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
    expect(queryByText(/Yavin IV/)).not.toBeInTheDocument();

    const allfilter = getAllByTestId('filter');
    const dropDownType = getByTestId('type');
    const t = dropDownType.querySelector("button[name*='rotation_period']");
  });
});
