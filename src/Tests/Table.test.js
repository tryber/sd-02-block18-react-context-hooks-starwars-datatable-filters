import React from 'react';
import { render, waitForDomChange, fireEvent } from '@testing-library/react';
import MyContext from '../Context/MyContext';
import App from '../App';

describe('Table', () => {
  test('Table shows values', async () => {
    const { getByText, getAllByText, getByTestId } = render(
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

    const inputName = getByTestId(/alpha-input-user-search/i);
    expect(inputName).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'aa' } });
    expect(dagobah).not.toBeInTheDocument();

    const alderaan = getByText(/alderaan/i);
    expect(alderaan).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'a' } });

    const insertColumn = getByTestId(/column-insert/i);
    const insertComparison = getByTestId(/comparison-insert/i);
    const insertValue = getByTestId(/value-insert/i);
    fireEvent.change(insertColumn, { target: { value: 'diameter' } });
    fireEvent.change(insertComparison, { target: { value: 'bigger_than' } });
    fireEvent.change(insertValue, { target: { value: 10000 } });

    setTimeout(() => {
      expect(dagobah).not.toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
    }, 1000);
  });
});
