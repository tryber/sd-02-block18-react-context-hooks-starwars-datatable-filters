import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import PlanetsDBProvider from '../context/PlanetsDBContext';
import Table from '../components/Table';

afterEach(cleanup);

describe('Tests Name Filter Input component', () => {
  it('contains a text input', () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );

    const nameFilterInput = getByTestId('name-filter-input');
    expect(nameFilterInput).toBeInTheDocument();
  });
});
