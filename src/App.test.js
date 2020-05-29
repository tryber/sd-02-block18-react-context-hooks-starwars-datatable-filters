import React from 'react';
import {
  render, cleanup, fireEvent, wait, waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import resultsMock from './mocks/resultsMock';

afterEach(cleanup);

describe('testing main page fixed elements', () => {
  it('testing main page title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/PLANETS DATATABLE/i)).toBeInTheDocument();
  });

  it('testing main page logo', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText('star wars logo')).toBeInTheDocument();
  });
});

describe('testing fetching table', () => {
  it('testing fetching animation', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const { queryByTestId } = render(<App />);
    await waitForElementToBeRemoved(() => queryByTestId('loading'));
  });

  it('testing table results', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const { findByText } = render(<App />);
    await findByText('Tatooine');
    global.fetch.mockClear();
  });

  it('testing API error', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 400,
        ok: false,
        json: () => Promise.resolve(new Error('API fora do ar')),
      }));
    const { queryByText, queryByTestId } = render(<App />);
    expect(queryByText('API fora do ar')).not.toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByTestId('loading'));
    expect(queryByText('API fora do ar')).toBeInTheDocument();
  });
});

describe('testing filter fields', () => {
  it('testing search input', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const { queryByText, getByLabelText, findByLabelText } = render(<App />);
    await findByLabelText(/Search by planet name/i);
    fireEvent.change(getByLabelText(/Search by planet name/i), { target: { value: 'alde' } });
    expect(getByLabelText(/Search by planet name/i).value).toBe('alde');
    await wait();
    expect(queryByText('Alderaan')).toBeInTheDocument();
    expect(queryByText('Tatooine')).not.toBeInTheDocument();
    global.fetch.mockClear();
  });

  it('testing numeric filter', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const {
      getByTestId, getAllByTestId, getByLabelText, getByText, queryByText,
    } = render(<App />);

    await wait();

    fireEvent.change(getByTestId('column-selector'), { target: { value: 'rotation_period' } });
    expect(getByTestId('column-selector').value).toBe('rotation_period');
    fireEvent.change(getByTestId('comparison-selector'), { target: { value: 'Maior que' } });
    expect(getByTestId('comparison-selector').value).toBe('Maior que');
    fireEvent.change(getByLabelText(/Type a number/i), { target: { value: 23 } });
    expect(getByLabelText(/Type a number/i).value).toBe('23');
    fireEvent.click(getByTestId('filter-button'));
    expect(getByText('☉ rotation period maior que 23')).toBeInTheDocument();
    expect(queryByText('Tatooine')).not.toBeInTheDocument();
    expect(queryByText('Alderaan')).toBeInTheDocument();

    fireEvent.change(getByTestId('column-selector'), { target: { value: 'orbital_period' } });
    expect(getByTestId('column-selector').value).toBe('orbital_period');
    fireEvent.change(getByTestId('comparison-selector'), { target: { value: 'Menor que' } });
    expect(getByTestId('comparison-selector').value).toBe('Menor que');
    fireEvent.change(getByLabelText(/Type a number/i), { target: { value: 400 } });
    expect(getByLabelText(/Type a number/i).value).toBe('400');
    fireEvent.click(getByTestId('filter-button'));
    expect(getByText('☉ orbital period menor que 400')).toBeInTheDocument();
    expect(queryByText('Kamino')).not.toBeInTheDocument();
    expect(queryByText('Alderaan')).toBeInTheDocument();

    fireEvent.change(getByTestId('column-selector'), { target: { value: 'diameter' } });
    expect(getByTestId('column-selector').value).toBe('diameter');
    fireEvent.change(getByTestId('comparison-selector'), { target: { value: 'Igual a' } });
    expect(getByTestId('comparison-selector').value).toBe('Igual a');
    fireEvent.change(getByLabelText(/Type a number/i), { target: { value: 12500 } });
    expect(getByLabelText(/Type a number/i).value).toBe('12500');
    fireEvent.click(getByTestId('filter-button'));
    expect(getByText('☉ diameter igual a 12500')).toBeInTheDocument();
    expect(queryByText('Naboo')).not.toBeInTheDocument();
    expect(queryByText('Alderaan')).toBeInTheDocument();

    fireEvent.click(getAllByTestId('delete-button')[0]);
    expect(queryByText('☉ orbital period maior que 23')).not.toBeInTheDocument();
    global.fetch.mockClear();
  });

  it('testing sort button', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(
        { json: () => Promise.resolve(resultsMock) },
      ));
    const { findAllByTestId, getAllByTestId } = render(<App />);
    await findAllByTestId('sort-button');
    fireEvent.click(getAllByTestId('sort-button')[0]);
    expect(getAllByTestId('planets-infos')[0].innerHTML).toBe('Yavin IV');
  });
});
