import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

const fetch = require('node-fetch');
const fetchSW = require('./services/swAPI');

afterEach(cleanup);

const data = [
  {
    name: 'Alderaan',
    orbital_period: '364',
    diameter: '12500',
    climate: 'temperate',
    terrain: 'grasslands, mountains',
    surface_water: '40',
    population: '2000000000',
    residents: [
      'https://swapi.co/api/people/5/',
      'https://swapi.co/api/people/68/',
      'https://swapi.co/api/people/81/',
    ],
    films: [
      'https://swapi.co/api/films/6/',
      'https://swapi.co/api/films/1/',
    ],
    created: '2014-12-10T11:35:48.479000Z',
    edited: '2014-12-20T20:58:18.420000Z',
    url: 'https://swapi.co/api/planets/2/',
  },
];

describe('first things first', () => {
  test('renders a "Loading..." message', () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  test('shows a welcome message', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('welcome')).toBeInTheDocument();
  });
});

describe('API mocking', () => {
  const { getByText } = render(<App />);
  jest.mock(fetchSW);
  fetch.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));
  return fetchSW()
    .then((planet) => expect(getByText(planet)).toBeInTheDocument());
});
