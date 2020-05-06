import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import App from '../App';
import MyContext from '../Context/MyContext';

describe('Loading', () => {
  test('Loading shows on screen', async () => {
    const { getByText } = render(
      <MyContext>
        <App />
      </MyContext>,
    );
    const loadingComp = getByText(/Loading.../i);
    expect(loadingComp).toBeInTheDocument();
    await waitForDomChange();
    expect(getByText(/Bão/i)).toBeInTheDocument();
  });
});
