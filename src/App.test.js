import '@testing-library/jest-dom/extend-expect';

// import React from 'react';
// import { render, waitForDomChange, cleanup } from '@testing-library/react';
// import App from './App';
// import { ProviderContext } from './context/Provider';

// afterEach(cleanup);

describe('renders the page structure correctly', () => {
  test('renders the title', () => {
    // const { getByText } = render(
    //   <ProviderContext>
    //     <App />
    //   </ProviderContext>
    // );

    // const title = getByText(/starwars datatable with filters/i);
    // expect(title).toBeInTheDocument();
  });

  test('renders the loading page', () => {
    // const { getByText, queryByText } = render(
    //   <ProviderContext>
    //     <App />
    //   </ProviderContext>
    // );

    // const loading = getByText(/loading.../i);
    // expect(loading).toBeInTheDocument();

    // const name = queryByText('Name');
    // expect(name).toBeNull();
  });

  test('after loading, renders the table and filters', async () => {
    // const { queryByText, getByText, getAllByText } = render(
    //   <ProviderContext>
    //     <App />
    //   </ProviderContext>
    // );

    // await waitForDomChange();

    // const loading = queryByText(/loading.../i);
    // expect(loading).toBeNull();

    // const climate = getByText('Climate');
    // expect(climate).toBeInTheDocument;

    // const diameters = getAllByText('Diameter');
    // expect(diameters.length).toBe(3)

    // const populations = getAllByText('Population');
    // expect(populations.length).toBe(3)

    // const names = getAllByText('Name');
    // expect(names.length).toBe(2);
  });
});
