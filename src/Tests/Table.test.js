import React from 'react';
import { render, waitForDomChange, fireEvent } from '@testing-library/react';
import MyContext from '../Context/MyContext';
import App from '../App';

describe('Table', () => {
  test('Table shows values', async () => {
    const {
      getByText,
      queryByText,
      getAllByText,
      getByTestId,
      findByTestId,
    } = render(
      <MyContext>
        <App />
      </MyContext>,
    );

    await waitForDomChange();
    const name = getAllByText(/name/i);
    expect(name[0]).toBeInTheDocument();
    expect(name[1]).toBeInTheDocument();
    const dagobah = getByText(/dagobah/i);
    expect(dagobah).toBeInTheDocument();
    expect(dagobah.tagName).toBe('TD');

    fireEvent.click(getByTestId(/show-sorted-value/i));
    expect(queryByText('No Sorted')).toBeInTheDocument();

    const inputName = getByTestId(/alpha-input-user-search/i);
    expect(inputName).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'aa' } });
    expect(dagobah).not.toBeInTheDocument();
    const alderaan = getByText(/alderaan/i);
    expect(alderaan).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: '' } });

    const insertColumn = getByTestId(/column-insert/i);
    const insertComparison = getByTestId(/comparison-insert/i);
    const insertValue = getByTestId(/value-insert/i);
    const endor = getByText(/endor/i);
    expect(endor).toBeInTheDocument();
    fireEvent.change(insertColumn, { target: { value: 'diameter' } });
    fireEvent.change(insertComparison, { target: { value: 'bigger_than' } });
    fireEvent.change(insertValue, { target: { value: 10000 } });

    const diameterFilter = await findByTestId(/diameter-filter-show/i);
    expect(diameterFilter).toBeInTheDocument();
    expect(endor).not.toBeInTheDocument();

    const kamino = getByText(/kamino/i);
    expect(kamino).toBeInTheDocument();
    fireEvent.change(insertColumn, { target: { value: 'surface_water' } });
    fireEvent.change(insertComparison, { target: { value: 'less_than' } });
    fireEvent.change(insertValue, { target: { value: 100 } });
    const surfaceFilter = await findByTestId(/surface_water-filter-show/i);
    expect(surfaceFilter).toBeInTheDocument();
    expect(kamino).not.toBeInTheDocument();

    const bespin = getByText(/Bespin/i);
    expect(bespin).toBeInTheDocument();
    fireEvent.change(insertColumn, { target: { value: 'rotation_period' } });
    fireEvent.change(insertComparison, { target: { value: 'equal_to' } });
    fireEvent.change(insertValue, { target: { value: 24 } });
    const rotationFilter = await findByTestId(/rotation_period-filter-show/i);
    expect(rotationFilter).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();

    const addSorted = getByTestId(/name-add-sorted/i);
    expect(addSorted).toBeInTheDocument();
    fireEvent.click(addSorted);

    expect(getByTestId(/show-column-sorted/i)).toBeInTheDocument();
    expect(queryByText('No Sorted')).not.toBeInTheDocument();
    expect(queryByText(/Name | DESC/i)).toBeInTheDocument();

    fireEvent.click(addSorted);
    expect(queryByText(/Name | ASC/i)).toBeInTheDocument();
  });
});
