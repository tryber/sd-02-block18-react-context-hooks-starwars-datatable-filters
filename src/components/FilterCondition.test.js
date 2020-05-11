import React from 'react';
import {
  render, cleanup, wait, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';
import Provider from '../context/Provider';
import data from './data';


afterEach(() => { 
  cleanup();
  jest.restoreAllMocks();
});

beforeEach(cleanup);

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
    getByTestId, getByText, queryByText, getAllByTestId, queryByTestId,
  } = render(
    <Provider>
      <App />
    </Provider>,
  );

  const api = 'https://swapi-trybe.herokuapp.com/api/planets';

  await wait();
  expect(global.fetch).toHaveBeenCalledWith(api);

  return {
    getByTestId,
    getByText,
    queryByText,
    queryByTestId,
    getAllByTestId,
  };
};

test('Filter by condition', async () => {
  const { getAllByTestId, queryByText, getByText } = await tableRender();
  await wait();

  const add = getByText('Add filter');
  fireEvent.click(add);
  const allfilter = getAllByTestId('filter');
  expect(allfilter.length).toBe(2);

  const selectType = allfilter[0].querySelector("p[name*='tagtype']");
  expect(selectType.innerHTML).toBe('rotation_period');
  const diameter = allfilter[0].querySelector("button[name*='diameter']");
  fireEvent.click(diameter);
  expect(selectType.innerHTML).toBe('diameter');

  const menorQue = allfilter[0].querySelector("button[name*='Menor que']");
  const selectCond = allfilter[0].querySelector("p[name*='tagcondition']");
  fireEvent.click(menorQue);
  expect(selectCond.innerHTML).toBe('Menor que');

  const inputCondition = allfilter[0].querySelector("input[name*='inputCondition']");
  fireEvent.change(inputCondition, { target: { value: '25' } });
  expect(inputCondition.value).toBe('25');
  expect(queryByText(/Yavin IV/)).not.toBeInTheDocument();

  const maiorQue = allfilter[0].querySelector("button[name*='Maior que']");
  fireEvent.click(maiorQue);
  expect(queryByText(/Yavin IV/)).toBeInTheDocument();
  expect(queryByText(/Alderaan/)).toBeInTheDocument();

  const igualQue = allfilter[0].querySelector("button[name*='Igual a']");
  fireEvent.click(igualQue);
  fireEvent.change(inputCondition, { target: { value: '24' } });
  expect(queryByText(/Alderaan/)).not.toBeInTheDocument();
});