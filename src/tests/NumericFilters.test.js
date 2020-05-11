import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import PlanetsDBProvider from '../context/PlanetsDBContext';
import Table from '../components/Table';

afterEach(cleanup);

describe('Tests Number Filter Inputs component', () => {
  it('selector contains all the columns', () => {
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

    selectors.forEach(([value]) => expect(getByTestId(`column-${value}-0`)).toBeInTheDocument());
  });

  it('comparison options are rendered in selector', () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );

    const comparisonOperators = ['lesserThan', 'higherThan', 'equalsThan', 'null'];

    comparisonOperators.forEach((comparison) => expect(getByTestId(`${comparison}-comparison-0`)).toBeInTheDocument());
  });

  it('has value input fields for each filter row', () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );

    expect(getByTestId('value-selector-0')).toBeInTheDocument();
  });

  it('has a remove button for each filter row', () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );

    expect(getByTestId('remove-filter-button-0')).toBeInTheDocument();
  });

  it('adds up a new filter row when all values are properly filled', async () => {
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <Table />
      </PlanetsDBProvider>,
    );

    fireEvent.change(getByTestId('column-selector-0'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison-selector-0'), { target: { value: 'lesserThan' } });
    fireEvent.change(getByTestId('value-selector-0'), { target: { value: '30000000' } });

    await wait(() => getByTestId('remove-filter-button-1'));

    expect(getByTestId('remove-filter-button-1')).toBeInTheDocument();
    expect(getByTestId('column-selector-1')).toBeInTheDocument();
    expect(getByTestId('comparison-selector-1')).toBeInTheDocument();
    expect(getByTestId('value-selector-1')).toBeInTheDocument();
  }, 15000);
});
