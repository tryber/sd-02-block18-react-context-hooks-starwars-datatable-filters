import React from 'react';
import { render, waitForDomChange, fireEvent } from '@testing-library/react';
import MyContext from '../Context/MyContext';
import App from '../App';

describe('Table', () => {
  test('Table shows values', async () => {

    const { getByText, getByTestId } = render(
      <MyContext>
        <App />
      </MyContext>,
    );

    await waitForDomChange();
    const name = getByText(/name/i);
    expect(name).toBeInTheDocument();
    const dagobah = getByText(/dagobah/i);
    expect(dagobah).toBeInTheDocument();

    const inputName = getByTestId(/alpha-input-user-search/i);
    expect(inputName).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'aa' } });
    expect(dagobah).not.toBeInTheDocument();

    const alderaan = getByText(/alderaan/i);
    expect(alderaan).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: '' } });
    expect(dagobah).toBeInTheDocument();

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
