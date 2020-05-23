import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import MyContext from '../Context/MyContext';
import App from '../App';

describe('Table Title', () => {
  test('title was rendered', async () => {
    const { getByText } = render(
      <MyContext>
        <App />
      </MyContext>,
    );

    await waitForDomChange();

    const filmsTitle = getByText(/created/i);
    expect(filmsTitle).toBeDefined();
    expect(filmsTitle.tagName).toBe('TH');
    expect(filmsTitle.parentElement.nodeName).toBe('TR');
  });
});
