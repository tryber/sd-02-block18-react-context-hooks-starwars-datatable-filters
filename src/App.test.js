import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import MyContext from './Context/MyContext';

test('renders learn react link', () => {
  const { getByText } = render(
    <MyContext>
      <App />
    </MyContext>,
  );
  expect(getByText(/Loading.../i)).toBeDefined();
});
