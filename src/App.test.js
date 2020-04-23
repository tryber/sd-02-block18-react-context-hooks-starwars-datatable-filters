import React from 'react';
import { render, waitForDomChange, wait, fireEvent, cleanup } from '@testing-library/react';
import { StarWarsContext } from './context/StarWarsContext';
import dataMocked from './tests/dataMocked';
import App from './App';

afterEach(cleanup)

describe('Tests of StarWars Database from API', () => {
  test('1 - Loading when load page in first time', () => {
    const { queryByText } = render(<App />);

    expect(queryByText(/Loading.../i)).toBeInTheDocument();
  })

  test('2 - Basics HTML Elements on Page', async () => {
    const { queryByText, queryAllByTestId } = render(<App />);

    const swTitle = queryByText(/StarWars DataTable with Filters/i);
    const dropColumn = queryAllByTestId('selectDropDown', {selector: 'option'});
    const compColumn = queryAllByTestId('comparisson', {selector: 'option'});
    const inputTest = queryAllByTestId('inputTest', {selector: 'input'});
    const planetSearch = queryAllByTestId('planet-search', {selector: 'input'});

    expect(swTitle).toBeInTheDocument();
    expect(dropColumn[0]).toBeInTheDocument();
    expect(compColumn[0]).toBeInTheDocument();
    expect(inputTest[0]).toBeInTheDocument();
    expect(planetSearch[0]).toBeInTheDocument();
  })
})
