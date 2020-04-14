import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import PlanetsDBProvider from '../context/PlanetsDBContext';
import Table from '../components/Table';

afterEach(cleanup);

describe('Tests Number Filter Inputs component', () => {
  it('contains a the correct selectors', () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );
    const selectors = [
      ['', '   '],
      ['population', 'Population'],
      ['orbital_period', 'Orbital period'],
      ['diameter', 'Diameter'],
      ['rotation_period', 'Rotation period'],
      ['surface_water', 'Surface water'],
    ];

    const columnsSelector = getByTestId('column-selector');
    expect(columnsSelector).toBeInTheDocument();
  });
});
