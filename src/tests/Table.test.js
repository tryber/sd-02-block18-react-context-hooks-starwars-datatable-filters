import React from 'react';
import { cleanup, wait, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import PlanetsDBProvider from '../context/PlanetsDBContext';
import useSWAPI from '../services/useSWAPI';
import Table from '../components/Table';
import NameFilter from '../components/NameFilter';

afterEach(cleanup);

describe('Tests Table component', () => {
  it('if planets are fetched, render table', async () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );

    await wait(() => getByTestId('table-container'));
    const tableContainer = getByTestId('table-container');
    expect(tableContainer).toBeInTheDocument();
  }, 60000);

  it('each cell contains data related to planets fetched from API', async () => {
    const { getAllByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );
    await wait(() => getAllByTestId('table-row'));
    const tableRows = getAllByTestId('table-row');
    const rowsData = tableRows.map((row) => String(row.innerHTML));

    const wrapper = ({ children }) => <PlanetsDBProvider>{children}</PlanetsDBProvider>;
    const { result: fetchedPlanets, waitForNextUpdate } = await renderHook(
      () => useSWAPI(), { wrapper },
    );
    await waitForNextUpdate();

    fetchedPlanets.current.forEach((planet, index) => Object.keys(planet).forEach(
      (property) => {
        if (property === 'residents') return null;
        if (property === 'films') {
          return expect(rowsData[index])
            .toEqual(expect.stringContaining(`${planet[property]}`.replace(/,/g, '')));
        }
        console.log('planet-property: ', planet[property], 'rowsData: ', rowsData[index]);
        return expect(planet[property].includes(rowsData[index])).toBeTruthy();
      },
    ));
  }, 60000);

  it('if names is input, table filters by name', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NameFilter />
        <Table />
      </PlanetsDBProvider>,
    );

    await wait(() => getByTestId('name-filter-input'));
    const nameFilterInput = getByTestId('name-filter-input');

    fireEvent.change(nameFilterInput, { target: { value: 'tatooine' } });

    await wait(() => getAllByTestId('table-row'));
    const tableRows = getAllByTestId('table-row');
    const rowsData = tableRows.map((row) => String(row.innerHTML));

    expect(tableRows.length).toBe(1);
    expect(rowsData[0]).toMatch(/tatooine/i);
  }, 60000);
});
