import React, { useEffect, useContext } from 'react';
import { cleanup, wait } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { PlanetsDBContext } from '../context/PlanetsDBContext';
import SWAPI from '../services/SWAPI';

afterEach(cleanup);

describe.skip('tests planetsDB api', () => {
  it('it fetches planets', async () => {
    const test = renderWithRouter(
      <PlanetsDBContext.Consumer>
        {(store) => <SWAPI store={store} />}
      </PlanetsDBContext.Consumer>,
    );

    await wait(() => expect(test).not.toBeNull());
    console.log(test);
  });
});
