import React, { useContext } from 'react';
import SWAPIProvider from '../context/SWAPIContext';

// function useFetchPlanets() {
//   const [state, setState] = useState(true);

//   useEffect(() => {
//     setState(fetchPlanets().then(() => setIsFetching(false)));
//   }, []);

//   return [state, setState];
// }

function renderTableHead(planets) {
  return (
    <thead>
      <tr>
        {Object.keys(planets[0]).map((key) => (
          key === 'residents'
            ? false
            : <th key={key}>{key.replace(/_/, ' ').toUpperCase()}</th>
        ))}
      </tr>
    </thead>
  );
}

function renderTableBody(planets) {
  return (
    <tbody>
      {planets.map((planet) => (
        <tr key={planet.name}>
          {Object.entries(planet).map(([key, value]) => (
            key === 'residents'
              ? false
              : <td key={value}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

const Table = () => {
  const { isFetching, planets } = useContext(SWAPIProvider);

  return (
    <div>
      {isFetching
        ? 'loading...'
        : (
          <table>
            {renderTableHead(planets)}
            {renderTableBody(planets)}
          </table>
        )}
    </div>
  );
};

export default Table;
