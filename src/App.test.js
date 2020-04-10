import React from 'react';
import {
  render, cleanup, waitForElementToBeRemoved,I
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Provider from './contexts/Provider';
import App from './App';
import { SW_BASE_API } from './services/SWapi';
import mockFetchPromise from './__mocks__/apiMock';

afterEach(cleanup);

describe('App tests', () => {
  test('show Loading until fetch is over', async () => {

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

    const { queryByText } = render(
      <Provider>
        <App />
      </Provider>,
    );

    expect(queryByText(/Loading/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByText(/Loadin/i));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${SW_BASE_API}/planets`);

    expect(queryByText(/Loading/i)).toBeNull();
  });
});