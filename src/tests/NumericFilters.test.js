import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import PlanetsDBProvider from '../context/PlanetsDBContext';
import Table from '../components/Table';
import NumericFilters from '../components/NumericFilters';


afterEach(cleanup);

describe('Tests Number Filter Inputs component', () => {
  // expect.assertions(6);
  it('selector contains all the columns', () => {
    expect.assertions(6);

    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
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
    expect.assertions(4);

    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    const comparisonOperators = ['lesserThan', 'higherThan', 'equalsThan', 'null'];

    comparisonOperators.forEach((comparison) => expect(getByTestId(`${comparison}-comparison-0`)).toBeInTheDocument());
  });

  it('has value input fields for each filter row', () => {
    expect.assertions(1);

    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    expect(getByTestId('value-selector-0')).toBeInTheDocument();
  });

  it('has a remove button for each filter row', () => {
    expect.assertions(1);

    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    expect(getByTestId('remove-filter-button-0')).toBeInTheDocument();
  });

  it('adds up a new filter row when all values are properly filled', () => {
    expect.assertions(4);
    const { getByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    fireEvent.change(getByTestId('column-selector-0'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison-selector-0'), { target: { value: 'lesserThan' } });
    fireEvent.change(getByTestId('value-selector-0'), { target: { value: '30000000' } });

    expect(getByTestId('remove-filter-button-1')).toBeInTheDocument();
    expect(getByTestId('column-selector-1')).toBeInTheDocument();
    expect(getByTestId('comparison-selector-1')).toBeInTheDocument();
    expect(getByTestId('value-selector-1')).toBeInTheDocument();
  }, 15000);

  it('adds up only until a total of 5 rows', () => {
    expect.assertions(20);
    const { getByTestId, queryByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );
    const indexArray = [0, 1, 2, 3, 4];

    const selectors = [
      ['', '   '],
      ['population', 'Population'],
      ['orbital_period', 'Orbital period'],
      ['diameter', 'Diameter'],
      ['rotation_period', 'Rotation period'],
      ['surface_water', 'Surface water'],
    ];

    indexArray.forEach((index) => {
      fireEvent.change(getByTestId(`column-selector-${index}`),
        { target: { value: index !== 4 ? `${selectors[index + 1][0]}` : `${selectors[5][0]}` } });
      fireEvent.change(getByTestId(`comparison-selector-${index}`), { target: { value: 'lesserThan' } });
      fireEvent.change(getByTestId(`value-selector-${index}`), { target: { value: '30000000' } });

      if (index === 4) {
        expect(queryByTestId(`remove-filter-button-${index + 1}`)).toBeNull();
        expect(queryByTestId(`column-selector-${index + 1}`)).toBeNull();
        expect(queryByTestId(`comparison-selector-${index + 1}`)).toBeNull();
        expect(queryByTestId(`value-selector-${index + 1}`)).toBeNull();
      }

      if (index !== 4) {
        expect(getByTestId(`remove-filter-button-${index + 1}`)).toBeInTheDocument();
        expect(getByTestId(`column-selector-${index + 1}`)).toBeInTheDocument();
        expect(getByTestId(`comparison-selector-${index + 1}`)).toBeInTheDocument();
        expect(getByTestId(`value-selector-${index + 1}`)).toBeInTheDocument();
      }
    });
  });

  it('erases filter rows properly', () => {
    expect.assertions(4);

    const { getByTestId, queryByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    fireEvent.change(getByTestId('column-selector-0'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison-selector-0'), { target: { value: 'lesserThan' } });
    fireEvent.change(getByTestId('value-selector-0'), { target: { value: '30000000' } });

    fireEvent.click(getByTestId('remove-filter-button-1'));

    expect(queryByTestId('remove-filter-button-1')).toBeNull();
    expect(queryByTestId('column-selector-1')).toBeNull();
    expect(queryByTestId('comparison-selector-1')).toBeNull();
    expect(queryByTestId('value-selector-1')).toBeNull();
  });

  it('will not delete the first filter row - I', () => {
    expect.assertions(4);

    const { getByTestId, queryByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    fireEvent.click(getByTestId('remove-filter-button-0'));

    expect(queryByTestId('remove-filter-button-0')).toBeInTheDocument();
    expect(queryByTestId('column-selector-0')).toBeInTheDocument();
    expect(queryByTestId('comparison-selector-0')).toBeInTheDocument();
    expect(queryByTestId('value-selector-0')).toBeInTheDocument();
  });

  it('will not delete the last filter row - II', () => {
    expect.assertions(28);
    const { getByTestId, queryByTestId, getAllByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    const indexArray = [0, 1, 2, 3, 4];

    const reverseArray = [4, 3, 2, 1, 0];

    const selectors = [
      ['', '   '],
      ['population', 'Population'],
      ['orbital_period', 'Orbital period'],
      ['diameter', 'Diameter'],
      ['rotation_period', 'Rotation period'],
      ['surface_water', 'Surface water'],
    ];

    indexArray.forEach((index) => {
      fireEvent.change(getByTestId(`column-selector-${index}`),
        { target: { value: index !== 4 ? `${selectors[index + 1][0]}` : `${selectors[5][0]}` } });
      fireEvent.change(getByTestId(`comparison-selector-${index}`), { target: { value: 'lesserThan' } });
      fireEvent.change(getByTestId(`value-selector-${index}`), { target: { value: '30000000' } });

      if (index === 4) {
        expect(queryByTestId(`remove-filter-button-${index + 1}`)).toBeNull();
        expect(queryByTestId(`column-selector-${index + 1}`)).toBeNull();
        expect(queryByTestId(`comparison-selector-${index + 1}`)).toBeNull();
        expect(queryByTestId(`value-selector-${index + 1}`)).toBeNull();
      }

      if (index !== 4) {
        expect(getByTestId(`remove-filter-button-${index + 1}`)).toBeInTheDocument();
        expect(getByTestId(`column-selector-${index + 1}`)).toBeInTheDocument();
        expect(getByTestId(`comparison-selector-${index + 1}`)).toBeInTheDocument();
        expect(getByTestId(`value-selector-${index + 1}`)).toBeInTheDocument();
      }
    });

    reverseArray.forEach((rowIndex) => {
      fireEvent.click(getByTestId(`remove-filter-button-${rowIndex}`));
      if (queryByTestId(`remove-filter-button-${rowIndex}`) !== null) {
        fireEvent.click(getByTestId(`remove-filter-button-${rowIndex}`));
      }
      if (rowIndex !== 0) expect(getAllByTestId(/remove-filter-button/g).length).toBe(rowIndex);
    });

    expect(queryByTestId('remove-filter-button-0')).toBeInTheDocument();
    expect(queryByTestId('column-selector-0')).toBeInTheDocument();
    expect(queryByTestId('comparison-selector-0')).toBeInTheDocument();
    expect(queryByTestId('value-selector-0')).toBeInTheDocument();
  });

  it('deleting rows in the middle creates no problem', () => {
    expect.assertions(8);
    const { getByTestId, queryByTestId } = renderWithRouter(
      <PlanetsDBProvider>
        <NumericFilters />
        <Table />
      </PlanetsDBProvider>,
    );

    fireEvent.change(getByTestId('column-selector-0'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison-selector-0'), { target: { value: 'lesserThan' } });
    fireEvent.change(getByTestId('value-selector-0'), { target: { value: '30000000' } });

    fireEvent.change(getByTestId('column-selector-1'), { target: { value: 'diameter' } });
    fireEvent.change(getByTestId('comparison-selector-1'), { target: { value: 'lesserThan' } });
    fireEvent.change(getByTestId('value-selector-1'), { target: { value: '30000000' } });

    fireEvent.click(getByTestId('remove-filter-button-1'));

    fireEvent.click(getByTestId('remove-filter-button-1'));

    expect(queryByTestId('remove-filter-button-1')).toBeInTheDocument();
    expect(queryByTestId('column-selector-1')).toBeInTheDocument();
    expect(queryByTestId('comparison-selector-1')).toBeInTheDocument();
    expect(queryByTestId('value-selector-1')).toBeInTheDocument();

    expect(queryByTestId('remove-filter-button-2')).toBeNull();
    expect(queryByTestId('column-selector-2')).toBeNull();
    expect(queryByTestId('comparison-selector-2')).toBeNull();
    expect(queryByTestId('value-selector-2')).toBeNull();
  });
});
