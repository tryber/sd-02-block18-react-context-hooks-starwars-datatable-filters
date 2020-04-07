import React from 'react';
import {
  render, cleanup, wait, fireEvent,
} from '@testing-library/react';
import App from './App';
import planets from './data';

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
  {
    name: 'Yavin IV',
    rotation_period: '24',
    orbital_period: '4818',
    diameter: '10200',
    climate: 'temperate, tropical',
    gravity: '1 standard',
    terrain: 'jungle, rainforests',
    surface_water: '8',
    population: '1000',
    residents: [],
    films: [
      'https://swapi.co/api/films/1/',
    ],
    created: '2014-12-10T11:37:19.144000Z',
    edited: '2014-12-20T20:58:18.421000Z',
    url: 'https://swapi.co/api/planets/3/',
  },
];

export default planets;

afterEach(cleanup);

describe('Coverage 90%', () => {
  test('renders learn react link', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...planets],
        }),
      }));
    const {
      getAllByText, getByText,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    Object.keys(data[1]).forEach((key) => {
      if (key !== 'residents') {
        expect(getAllByText(key)[0]).toBeInTheDocument();
      }
    });
    expect(getByText(/Alderaan/)).toBeInTheDocument();
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
  });
  test('filter name test', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...planets],
        }),
      }));
    const {
      queryByText, getByText, getByTestId,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    expect(getByTestId('input-name')).toBeInTheDocument();
    expect(getByTestId('input-name').value).toBe('');
    fireEvent.change(getByTestId('input-name'), { target: { value: 'y' } });
    expect(getByTestId('input-name').value).toBe('y');
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
    expect(queryByText(/Alderaan/)).toBeNull();
    fireEvent.change(getByTestId('input-name'), { target: { value: '' } });
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
  });
  test("test numeric filters 'igual a'", async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...planets],
        }),
      }));
    const {
      getByText, getByTestId, queryByTestId, queryByText,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    expect(getByTestId('column')).toBeInTheDocument();
    expect(queryByTestId('comparison')).toBeNull();
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('column').value).toBe('');
    fireEvent.change(getByTestId('column'), { target: { value: 'orbital_period' } });
    expect(getByTestId('column').value).toBe('orbital_period');
    expect(getByTestId('comparison')).toBeInTheDocument();
    expect(getByTestId('comparison').value).toBe('');
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    fireEvent.change(getByTestId('comparison'), { target: { value: 'igual a' } });
    expect(getByTestId('comparison').value).toBe('igual a');
    expect(queryByTestId('value')).toBeInTheDocument();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('value').value).toBe('');
    fireEvent.change(getByTestId('value'), { target: { value: '4818' } });
    expect(getByTestId('value').value).toBe('4818');
    expect(queryByTestId('filter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('filter'));
    await wait();
    expect(queryByText(/Alderaan/)).toBeNull();
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
    expect(queryByTestId('infoExclude')).toBeInTheDocument();
    expect(queryByTestId('removeFilter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('removeFilter'));
    await wait();
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
  });
  test("test numeric filters with 'maior que' ", async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...planets],
        }),
      }));
    const {
      getByText, getByTestId, queryByTestId, queryByText,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    expect(getByTestId('column')).toBeInTheDocument();
    expect(queryByTestId('comparison')).toBeNull();
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('column').value).toBe('');
    fireEvent.change(getByTestId('column'), { target: { value: 'orbital_period' } });
    expect(getByTestId('column').value).toBe('orbital_period');
    expect(getByTestId('comparison')).toBeInTheDocument();
    expect(getByTestId('comparison').value).toBe('');
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    fireEvent.change(getByTestId('comparison'), { target: { value: 'maior que' } });
    expect(getByTestId('comparison').value).toBe('maior que');
    expect(queryByTestId('value')).toBeInTheDocument();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('value').value).toBe('');
    fireEvent.change(getByTestId('value'), { target: { value: '4817' } });
    expect(getByTestId('value').value).toBe('4817');
    expect(queryByTestId('filter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('filter'));
    await wait();
    expect(queryByText(/Alderaan/)).toBeNull();
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
    expect(queryByTestId('infoExclude')).toBeInTheDocument();
    expect(queryByTestId('removeFilter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('removeFilter'));
    await wait();
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
  });
  test("test numeric filters with 'menor que' ", async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...planets],
        }),
      }));
    const {
      getByText, getByTestId, queryByTestId, queryByText,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    expect(getByTestId('column')).toBeInTheDocument();
    expect(queryByTestId('comparison')).toBeNull();
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('column').value).toBe('');
    fireEvent.change(getByTestId('column'), { target: { value: 'orbital_period' } });
    expect(getByTestId('column').value).toBe('orbital_period');
    expect(getByTestId('comparison')).toBeInTheDocument();
    expect(getByTestId('comparison').value).toBe('');
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    fireEvent.change(getByTestId('comparison'), { target: { value: 'menor que' } });
    expect(getByTestId('comparison').value).toBe('menor que');
    expect(queryByTestId('value')).toBeInTheDocument();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('value').value).toBe('');
    fireEvent.change(getByTestId('value'), { target: { value: '4817' } });
    expect(getByTestId('value').value).toBe('4817');
    expect(queryByTestId('filter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('filter'));
    await wait();
    expect(queryByText(/Yavin IV/)).toBeNull();
    expect(getByText(/Alderaan/)).toBeInTheDocument();
    expect(queryByTestId('infoExclude')).toBeInTheDocument();
    expect(queryByTestId('removeFilter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('removeFilter'));
    await wait();
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
    expect(getByText(/Yavin IV/)).toBeInTheDocument();
  });
  test('test error api ', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => (Promise.reject('error')));
    const {
      getByText,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    expect(getByText(/error/i)).toBeInTheDocument();
  });
  test('test 2 numeric filters', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...planets],
        }),
      }));
    const {
      getByText, getByTestId, queryByTestId, queryByText,
    } = render(<App />);
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await wait();
    fireEvent.change(getByTestId('input-name'), { target: { value: 'aa' } });
    expect(getByTestId('column')).toBeInTheDocument();
    expect(queryByTestId('comparison')).toBeNull();
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('column').value).toBe('');
    fireEvent.change(getByTestId('column'), { target: { value: 'orbital_period' } });
    expect(getByTestId('column').value).toBe('orbital_period');
    expect(getByTestId('comparison')).toBeInTheDocument();
    expect(getByTestId('comparison').value).toBe('');
    expect(queryByTestId('value')).toBeNull();
    expect(queryByTestId('filter')).toBeNull();
    fireEvent.change(getByTestId('comparison'), { target: { value: 'menor que' } });
    expect(getByTestId('comparison').value).toBe('menor que');
    expect(queryByTestId('value')).toBeInTheDocument();
    expect(queryByTestId('filter')).toBeNull();
    expect(getByTestId('value').value).toBe('');
    fireEvent.change(getByTestId('value'), { target: { value: '4817' } });
    expect(getByTestId('value').value).toBe('4817');
    expect(queryByTestId('filter')).toBeInTheDocument();
    fireEvent.click(queryByTestId('filter'));
    await wait();
    expect(queryByText(/Yavin IV/)).toBeNull();
    expect(getByText(/Alderaan/)).toBeInTheDocument();
    expect(queryByTestId('infoExclude')).toBeInTheDocument();
    expect(queryByTestId('removeFilter')).toBeInTheDocument();
    fireEvent.change(getByTestId('column'), { target: { value: 'surface_water' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'igual a' } });
    fireEvent.change(getByTestId('value'), { target: { value: '40' } });
    fireEvent.click(queryByTestId('filter'));
    await wait();
    expect(queryByText(/Alderaan/)).toBeInTheDocument();
  });
});
