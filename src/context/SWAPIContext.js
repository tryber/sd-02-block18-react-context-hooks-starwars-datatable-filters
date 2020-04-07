import { createContext } from 'react';

const SWAPIContext = createContext({
  isFetching: true,
  planets: [],
});

export default SWAPIContext;
