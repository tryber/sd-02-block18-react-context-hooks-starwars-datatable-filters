import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import MyContext from '../Context/MyContext';
import App from '../App';

describe('Table', () => {
  test('Table shows values', async () => {
    const { getByText } = render(
      <MyContext>
        <App />
      </MyContext>,
    );
    await waitForDomChange();
    const name = getByText(/name/i);
    expect(name).toBeInTheDocument();
    const dagobah = getByText(/dagobah/i);
    expect(dagobah).toBeInTheDocument();
  });
});
