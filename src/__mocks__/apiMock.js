export const planets = [
  {
    name: 'Alderaan',
    rotation_period: '24',
    orbital_period: '364',
    diameter: '12500',
    climate: 'temperate',
    gravity: '1 standard',
    terrain: 'grasslands, mountains',
    surface_water: '40',
    population: '2000000000',
    films: [
      'https://swapi.co/api/films/6/',
      'https://swapi.co/api/films/2/',
    ],
    created: '2014-12-10T11:35:48.479000Z',
    edited: '2014-12-20T20:58:18.420000Z',
    url: 'https://swapi.co/api/planets/2/',
  },
  {
    name: 'Yavin IV',
    rotation_period: '42',
    orbital_period: '4818',
    diameter: '10200',
    climate: 'temperate, tropical',
    gravity: '1.5 standard',
    terrain: 'jungle, rainforests',
    surface_water: '8',
    population: '1000',
    films: [
      'https://swapi.co/api/films/1/',
    ],
    created: '2014-12-10T11:37:19.144000Z',
    edited: '2014-12-20T20:58:18.421000Z',
    url: 'https://swapi.co/api/planets/3/',
  },
];

const mockSuccessResponse = {
  results: [...planets],
};
const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
const mockFetchPromise = Promise.resolve({
  status: 200,
  ok: true,
  json: () => mockJsonPromise,
});

export default mockFetchPromise;
