import React from 'react';
import { render, cleanup, fireEvent, wait, waitForElement } from '@testing-library/react';
import App from './App';
import resultsMock from './mocks/resultsMock';

afterEach(cleanup);

describe('testing main page fixed elements', () => {
  it('testing main page title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/PLANETS DATATABLE/i)).toBeInTheDocument();
  });

  it('testing mais page logo', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText('star wars logo')).toBeInTheDocument();
  });
});

describe('testing fetching table', () => {
  it('testing fetching animation', async () => {
    const { findByTestId } = render(<App />);
    await findByTestId('loading');
  });

  it('testing table results', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const { findByText } = render(<App />);
    await findByText('Tatooine');
  });
});

describe('testing filter fields', () => {
  it('testing search input', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const { queryByText, findByText, getByLabelText, findByLabelText } = render(<App />);
    await findByLabelText(/Search by planet name/i);
    fireEvent.change(getByLabelText(/Search by planet name/i), { target: { value: 'alde' } });
    expect(getByLabelText(/Search by planet name/i).value).toBe('alde');
    await wait();
    expect(queryByText('Alderaan')).toBeInTheDocument();
    expect(queryByText('Tatooine')).not.toBeInTheDocument();
  });

  it('testing filter', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const {
      getByText, getAllByText, findByText, getByLabelText, findByLabelText, getByTestId,
    } = render(<App />);
    await findByText(/Choose a column:/i);
    await findByText(/Choose a comparison:/i);
    await findByLabelText(/Type a number/i);
    const DOWN_ARROW = { keyCode: 40 };
    const getSelectItem = (getByTextSelect, getByTextOption) => async (selectLabel, optionText) => {
      fireEvent.keyDown(getByTextSelect(selectLabel), DOWN_ARROW);
      await waitForElement(() => getByTextOption(optionText)[0]);
      fireEvent.click(getByTextOption(optionText)[0]);
    };
    const selectItem = getSelectItem(getByText, getAllByText);
    await selectItem(/Choose a column:/i, /orbital period/i);
    await selectItem(/Choose a comparison:/i, /maior que/i);
    fireEvent.change(getByLabelText(/Type a number/i), { target: { value: 400 } });
    expect(getByLabelText(/Type a number/i).value).toBe('400');
    fireEvent.click(getByTestId('filter-button'));
    await wait();
    // expect(getByText('☉ orbital period maior que 400')).toBeInTheDocument();
  });
});
