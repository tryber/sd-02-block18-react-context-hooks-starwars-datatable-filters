import React, { useEffect, useContext } from 'react';
import { cleanup, wait } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import PlanetsDBProvider, { PlanetsDBContext } from '../context/PlanetsDBContext';
import useSWAPI from '../services/useSWAPI';
import { instanceOf } from 'prop-types';
import Table from '../components/Table';

afterEach(cleanup);

describe('Tests Table component', () => {
  it('if planets are fetched, render table', () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );
  });
});
