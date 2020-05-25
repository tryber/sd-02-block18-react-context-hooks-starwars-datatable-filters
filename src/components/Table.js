import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import THead from './THead';

const filtrarPlanetasPorNome = (arrayPlanetas, texto) => (
  arrayPlanetas.filter((planeta) => planeta.name.toUpperCase().includes(texto.toUpperCase()))
);

function filtrarPorComparacao(arrPlanetsComFilDeNome, objFiltrosFiltrando) {
  const { column, comparison, value } = objFiltrosFiltrando || {};
  return arrPlanetsComFilDeNome.filter((objComCadaPlaneta) => {
    if (objComCadaPlaneta[column] === 'unknown') return false;

    switch (comparison) {
      case 'Maior que': return Number(objComCadaPlaneta[column]) > Number(value);
      case 'Menor que': return Number(objComCadaPlaneta[column]) < Number(value);
      case 'Igual a': return Number(objComCadaPlaneta[column]) === Number(value);
      default: return true;
    }
  });
}

function filtrarTodasAsComparacoes(arrPlanetsComFilDeNome, arrayNumericFilters) {
  let arrayPlanetasFiltrado = arrPlanetsComFilDeNome;

  arrayNumericFilters.forEach((objectNumericValues) => {
    arrayPlanetasFiltrado = filtrarPorComparacao(arrayPlanetasFiltrado, objectNumericValues);
  });
  return arrayPlanetasFiltrado;
}

const callbackParaSortName = (objPlanet1, objPlanet2) => (
  objPlanet1.name > objPlanet2.name ? 1 : -1
);

const callbackParaSortNumeros = (objPlanet1, objPlanet2, column) => (
  Number(objPlanet1[column]) > Number(objPlanet2[column]) ? 1 : -1
);

function ordenarArray(arrTodoFiltrado, objOrdenacao) {
  const { column, order } = objOrdenacao;
  const arrayOrdenado = arrTodoFiltrado;

  if (column === 'name') {
    arrayOrdenado.sort(
      callbackParaSortName,
    );
  } else {
    arrayOrdenado.sort(
      (obj1, obj2) => callbackParaSortNumeros(obj1, obj2, column),
    );
  }
  if (order === 'DESC') {
    arrayOrdenado.reverse();
  }
  return arrayOrdenado;
}

const renderTBody = (arrayOrdenado) => (
  <tbody>
    {arrayOrdenado.map((planet) => (
      <tr key={planet.name}>
        <td data-testid="planets">{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ))}
  </tbody>
);

const Table = () => {
  const contextState = useContext(StarWarsContext);
  const arrayPlanetas = contextState.swData.arrPlanetas;
  const arrayNumericFilters = contextState.filters.slice(1).map((obj) => obj.numericValues) || [];
  const objOrdenacao = contextState.orderObj;

  const arrPlanetsComFilDeNome = filtrarPlanetasPorNome(
    arrayPlanetas,
    contextState.filters[0].name,
  );
  const arrTodoFiltrado = filtrarTodasAsComparacoes(arrPlanetsComFilDeNome, arrayNumericFilters);
  const arrayOrdenado = ordenarArray(arrTodoFiltrado, objOrdenacao);

  return (
    <div>
      <table>
        <THead />
        {renderTBody(arrayOrdenado)}
      </table>
    </div>
  );
};

export default Table;
