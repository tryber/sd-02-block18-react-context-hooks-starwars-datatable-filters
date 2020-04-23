import React from 'react';
import { render, waitForDomChange, wait, fireEvent, cleanup } from '@testing-library/react';
import { StarWarsContext } from './context/StarWarsContext';
import dataMocked from './tests/dataMocked';
import App from './App';

afterEach(cleanup)

describe('Tests of StarWars Database from API', () => {
  test('1 - Loading when load page in first time without API', () => {
    const { queryByText } = render(<App />);
    const swTitle = queryByText(/StarWars DataTable with Filters/i);

    expect(queryByText(/Loading.../i)).toBeInTheDocument();
  })

  test('2 - Basics HTML Elements on Page', () => {
    const { queryByText, queryByTestId, queryAllByTestId } = render(<App />);

    const swTitle = queryByText(/StarWars DataTable with Filters/i);
    const dropColumn = queryAllByTestId(/selectDropDown/i);
    const compColumn = queryByTestId(/comparisson/i);
    const inputValue = queryByTestId(/inputValue/i);
    const planetSearch = queryByTestId(/planet-search/i);

    expect(swTitle).toBeInTheDocument();
    expect(dropColumn[0]).toBeInTheDocument();
    expect(compColumn[0]).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(planetSearch).toBeInTheDocument();
  })

  test('3 - Search some planets and just this will showed on screen', async () => {
    const { queryByText, queryByTestId } = render(<App />);

    await waitForDomChange();

    const planetSearch = queryByTestId(/planet-search/i);
    const alderaan = queryByText(/Alderaan/i);
    const hoth = queryByText(/Hoth/i);
    const dagobah = queryByText(/Dagobah/i);
    fireEvent.change(planetSearch, { target: { value: 'h'}});
    await wait();
    expect(alderaan).not.toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    expect(dagobah).toBeInTheDocument();
  })
})
