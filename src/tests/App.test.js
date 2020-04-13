import React from 'react';
import { render, waitForDomChange, wait, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import { StarWarsContext } from '../context/StarWarsContext';
import data from './mockResponse';

afterEach(cleanup);

describe('StarWars DataTable tests', () => {
  test('loads page and fetches an error', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: false,
        json: () => Promise.resolve({
          message: 'Failed to fetch',
        }),
      }));
    const { queryByText, queryByTestId } = render(<App />);

    expect(queryByTestId(/boxColumn/i)).toBeInTheDocument();
    expect(queryByTestId(/boxComparison/i)).toBeInTheDocument();
    expect(queryByTestId(/boxValue/i)).toBeInTheDocument();
    const buttonFilter = queryByTestId(/buttonFilter/i);
    expect(buttonFilter).toBeInTheDocument();
    expect(buttonFilter.disabled).toBeTruthy();
    expect(queryByTestId(/boxName/i)).toBeInTheDocument();
    expect(queryByText(/Loading.../i)).toBeInTheDocument();
    expect(queryByText(/StarWars Datatable with Filters/i)).not.toBeInTheDocument();
    expect(queryByText(/Failed to fetch/i)).not.toBeInTheDocument();

    await wait();

    expect(queryByText(/Loading.../i)).not.toBeInTheDocument();
    expect(queryByText(/StarWars Datatable with Filters/i)).toBeInTheDocument();
    expect(queryByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  test('loads page and fetches an response', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...data],
        }),
      }));
    const { queryByText, queryByTestId } = render(<App />);

    expect(queryByText(/Loading.../i)).toBeInTheDocument();
    expect(queryByText(/StarWars Datatable with Filters/i)).not.toBeInTheDocument();

    await wait();

    expect(queryByText(/Loading.../i)).not.toBeInTheDocument();
    expect(queryByText(/StarWars Datatable with Filters/i)).toBeInTheDocument();
    const planet1 = queryByText(/Alderaan/i);
    expect(planet1).toBeInTheDocument();
    const planet2 = queryByText(/Yavin IV/i);
    expect(planet2).toBeInTheDocument();
    const planet3 = queryByText(/Hoth/i);
    expect(planet3).toBeInTheDocument();
    const planet4 = queryByText(/Coruscant/i);
    expect(planet4).toBeInTheDocument();
    const boxName = queryByTestId(/boxName/i);
    fireEvent.change(boxName, { target: { value: 'ald' } });
    expect(planet1).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
    expect(planet3).not.toBeInTheDocument();
    expect(planet4).not.toBeInTheDocument();
  });

  test('after change, testing numeric values', async () => {
    const { queryByText, queryByTestId } = render(<App />);

    await waitForDomChange();

    const buttonFilter = queryByTestId(/buttonFilter/i);
    expect(buttonFilter).toBeInTheDocument();
    expect(buttonFilter.disabled).toBeTruthy();
    const planet1 = queryByText(/Alderaan/i);
    let planet2 = queryByText(/Yavin IV/i);
    let planet3 = queryByText(/Hoth/i);
    let planet4 = queryByText(/Coruscant/i);
    const boxColumn = queryByTestId(/boxColumn/i);
    fireEvent.change(boxColumn, { target: { value: 'rotation_period' } });
    expect(boxColumn.value).toBe('rotation_period');
    expect(buttonFilter.disabled).toBeTruthy();
    const boxComparison = queryByTestId(/boxComparison/i);
    fireEvent.change(boxComparison, { target: { value: 'maior que' } });
    expect(boxComparison.value).toBe('maior que');
    expect(buttonFilter.disabled).toBeTruthy();
    const boxValue = queryByTestId(/boxValue/i);
    fireEvent.change(boxValue, { target: { value: '23' } });
    expect(boxValue.value).toBe('23');
    expect(buttonFilter.disabled).toBeFalsy();
    fireEvent.click(buttonFilter);

    await wait();

    const savedFilterTitle1 = queryByTestId(/saved-filters-title-rotation_period/i);
    expect(savedFilterTitle1.innerHTML).toBe('Rotation period');
    expect(savedFilterTitle1).toBeInTheDocument();
    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
    expect(planet3).not.toBeInTheDocument();
    expect(planet4).toBeInTheDocument();
    fireEvent.change(boxColumn, { target: { value: 'orbital_period' } });
    fireEvent.change(boxComparison, { target: { value: 'menor que' } });
    fireEvent.change(boxValue, { target: { value: '1000' } });
    fireEvent.click(buttonFilter);

    await wait();

    const savedFilterTitle2 = queryByTestId(/saved-filters-title-orbital_period/i);
    expect(savedFilterTitle2).toBeInTheDocument();
    expect(savedFilterTitle2.innerHTML).toBe('Orbital period');
    expect(planet1).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
    expect(planet3).not.toBeInTheDocument();
    expect(planet4).toBeInTheDocument();
    fireEvent.change(boxColumn, { target: { value: 'diameter' } });
    fireEvent.change(boxComparison, { target: { value: 'igual a' } });
    fireEvent.change(boxValue, { target: { value: '12500' } });
    fireEvent.click(buttonFilter);

    await wait();

    const savedFilterTitle3 = queryByTestId(/saved-filters-title-diameter/i);
    expect(savedFilterTitle3).toBeInTheDocument();
    expect(savedFilterTitle3.innerHTML).toBe('Diameter');
    expect(planet1).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
    expect(planet3).not.toBeInTheDocument();
    expect(planet4).not.toBeInTheDocument();
    const savedFilterButton1 = queryByTestId(/saved-filters-button-rotation_period/i);
    const savedFilterButton2 = queryByTestId(/saved-filters-button-orbital_period/i);
    const savedFilterButton3 = queryByTestId(/saved-filters-button-diameter/i);
    expect(savedFilterButton1).toBeInTheDocument();
    expect(savedFilterButton2).toBeInTheDocument();
    expect(savedFilterButton3).toBeInTheDocument();
    fireEvent.change(boxColumn, { target: { value: 'population' } });
    fireEvent.change(boxComparison, { target: { value: 'maior que' } });
    fireEvent.change(boxValue, { target: { value: '1' } });
    fireEvent.click(buttonFilter);

    fireEvent.change(boxColumn, { target: { value: 'surface_water' } });
    fireEvent.change(boxComparison, { target: { value: 'maior que' } });
    fireEvent.change(boxValue, { target: { value: '39' } });
    expect(queryByTestId(/noFilter/i)).not.toBeInTheDocument();
    fireEvent.click(buttonFilter);


    await wait();

    expect(queryByTestId(/boxColumn/i)).not.toBeInTheDocument();
    expect(queryByTestId(/boxComparison/i)).not.toBeInTheDocument();
    expect(queryByTestId(/boxValue/i)).not.toBeInTheDocument();
    expect(queryByTestId(/buttonFilter/i)).not.toBeInTheDocument();
    expect(queryByTestId(/noFilter/i)).toBeInTheDocument();

    const savedFilterButton4 = queryByTestId(/saved-filters-button-population/i);
    fireEvent.click(savedFilterButton4);
    const savedFilterButton5 = queryByTestId(/saved-filters-button-surface_water/i);
    fireEvent.click(savedFilterButton5);
    fireEvent.click(savedFilterButton3);

    await wait();

    expect(savedFilterButton3).not.toBeInTheDocument();
    planet4 = queryByText(/Coruscant/i);
    expect(planet1).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
    expect(planet3).not.toBeInTheDocument();
    expect(planet4).toBeInTheDocument();

    await wait();

    fireEvent.click(savedFilterButton2);
    expect(savedFilterButton2).not.toBeInTheDocument();
    planet2 = queryByText(/Yavin IV/i);
    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
    expect(planet3).not.toBeInTheDocument();
    expect(planet4).toBeInTheDocument();

    await wait();

    fireEvent.click(savedFilterButton1);
    expect(savedFilterButton1).not.toBeInTheDocument();
    planet3 = queryByText(/Hoth/i);
    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
    expect(planet3).toBeInTheDocument();
    expect(planet4).toBeInTheDocument();
  });
});
