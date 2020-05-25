import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const FiltersDropdown = () => {
  const contextValues = useContext(StarWarsContext);
  const arrayColunasJaSelecionadas = contextValues.filters
    .slice(1)
    .map((obj) => obj.numericValues.column);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  const adicionaFiltro = () => {
    contextValues.setNumericFilter({ column, comparison, value });
    setColumn('');
    setComparison('');
    setValue('');
  };

  const renderColumnDrowpdown = (colunasRestantes, columnDrop) => (
    <div data-testid="filter">
      <select
        defaultValue=""
        value={columnDrop}
        onChange={(event) => setColumn(event.target.value)}
        data-testid="column-inserted"
      >
        <option value="" disabled>Selecione uma coluna</option>
        {colunasRestantes.map((coluna) => <option key={coluna} value={coluna}>{coluna}</option>)}
      </select>
    </div>
  );

  const renderComparisonDropdown = (comparisonDrop) => (
    <div>
      <select
        defaultValue=""
        value={comparisonDrop}
        onChange={(event) => setComparison(event.target.value)}
        data-testid="comparison-inserted"
      >
        <option value="" disabled>Selecione uma comparação</option>
        <option value="Maior que">Maior que</option>
        <option value="Menor que">Menor que</option>
        <option value="Igual a">Igual a</option>
      </select>
    </div>
  );

  const renderNumberComparison = (valueInput) => (
    <div>
      <input
        type="number"
        value={valueInput}
        placeholder="Digite um número"
        data-testid="value-inserted"
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );

  const renderComparButton = (columnDrop, comparisonDrop, valueInput) => (
    <button
      type="button"
      className="filter-btn"
      data-testid="botao-filtrar"
      onClick={adicionaFiltro}
      disabled={!(columnDrop && comparisonDrop && valueInput)}
    >
        Filtrar
    </button>
  );

  const todasAsColunas = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const colunasRestantes = todasAsColunas.filter((coluna) => (
    !(arrayColunasJaSelecionadas.includes(coluna))
    // (arrayColunasJaSelecionadas.includes(coluna)) ? false : true
  ));

  return colunasRestantes.length !== 0 ? (
    <article>
      <section className="comparisons">
        {renderColumnDrowpdown(colunasRestantes, column)}
        {renderComparisonDropdown(comparison)}
        {renderNumberComparison(value)}
        {renderComparButton(column, comparison, value)}
      </section>
    </article>
  ) : null;
};

export default FiltersDropdown;
