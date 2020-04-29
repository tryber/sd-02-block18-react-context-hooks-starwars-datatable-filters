import React from 'react';
import {
  render, cleanup, wait, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Panel from './Panel';
import Provider from '../context/Provider';
import data from './data';

afterEach(() => { 
  cleanup();
  jest.restoreAllMocks();
});

const tableRender = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({
        results: [...data],

      }),
    }));

  const {
    getByTestId, getByText, queryByText, getAllByTestId,
  } = render(
    <Provider>
      <Panel />
    </Provider>,
  );
  const api = 'https://cors-anywhere.herokuapp.com/https://swapi-trybe.herokuapp.com/api/planets';

  await wait();
  expect(global.fetch).toHaveBeenCalledWith(api);

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
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
  });

  test('Filter by name', async () => {
    const { getByTestId, queryByText } = await tableRender();
    const filters = getByTestId('filters');
    expect(filters).toBeInTheDocument();

    const inputName = getByTestId('inputName');
    fireEvent.change(inputName, { target: { value: 'Alderaan' } });
    expect(inputName.value).toBe('Alderaan');

    expect(queryByText(/Alderaan/)).toBeInTheDocument();
    expect(queryByText(/Yavin IV/)).not.toBeInTheDocument();
  });

  test('Filter by condition', async () => {
    const { getAllByTestId, queryByText, getByText } = await tableRender();
    await wait();
    const add = getByText('Add filter');
    fireEvent.click(add);
    const allfilter = getAllByTestId('filter');
    expect(allfilter.length).toBe(2);

    const rotationPeriod = allfilter[0].querySelector("button[name*='rotation_period']");
    const selectType = allfilter[0].querySelector("p[name*='tagtype']");
    fireEvent.click(rotationPeriod);
    expect(selectType.innerHTML).toBe('rotation_period');

    const menorQue = allfilter[0].querySelector("button[name*='Menor que']");
    const selectCond = allfilter[0].querySelector("p[name*='tagcondition']");
    fireEvent.click(menorQue);
    expect(selectCond.innerHTML).toBe('Menor que');

    const inputCondition = allfilter[0].querySelector("input[name*='inputCondition']");
    fireEvent.change(inputCondition, { target: { value: '25' } });
    expect(inputCondition.value).toBe('25');

    expect(queryByText(/Yavin IV/)).not.toBeInTheDocument();
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
  });

  test('Filter by order', async () => {
    const { getByTestId } = await tableRender();

    const table = getByTestId('table');
    const comp_order = getByTestId('comp_order');
    const btnDesc = comp_order.querySelector("button[name*='DESC']");
    fireEvent.click(btnDesc);

    const order = getByTestId('order');
    const name = order.querySelector("button[name*='name']");
    fireEvent.click(name);

    const tbody = table.querySelector('tbody');
    const trs = tbody.querySelectorAll('tr');

    expect(trs[0].querySelectorAll('td')[0].innerHTML).toBe('Yavin IV');
    expect(trs[1].querySelectorAll('td')[0].innerHTML).toBe('Alderaan');

    const btnAsc = comp_order.querySelector("button[name*='ASC']");
    fireEvent.click(btnAsc);
    const rotation_period = order.querySelector("button[name*='rotation_period']");
    fireEvent.click(rotation_period);

    expect(trs[0].querySelectorAll('td')[1].innerHTML).toBe('42');
    expect(trs[1].querySelectorAll('td')[1].innerHTML).toBe('24');
  });
});
