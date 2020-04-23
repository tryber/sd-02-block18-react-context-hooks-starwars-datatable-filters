import React, { useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import HeadTable from './HeadTable';
import SelectDropDown from './SelectDropDown';
import ConditionDropDown from './ConditionDropDown';
import InputNumber from './InputNumber';
import CellFiltered from './CellFiltered';
import CellTable from './CellTable';
import ButtonSearch from './ButtonSearch';
import './style/Table.css';

const Table = () => {
  const { onLoad, callAPI, planetAction, dataMockFilterOn } = useContext(StarWarsContext);

  useEffect(() => {
    callAPI();
  }, []);
  if (!onLoad) return (<div style={{ textAlign: 'center' }}><h1>Loading...</h1></div>);
  return (
    <React.Fragment>
      <div className="container-header">
        <input type="text" onChange={(e) => planetAction(e.target.value)} />
        <SelectDropDown />
        <ConditionDropDown />
        <InputNumber />
        <ButtonSearch />
        <div>StarWars DataTable with Filters</div>
      </div>
      <table>
        <HeadTable />
        {dataMockFilterOn ? <CellFiltered /> : <CellTable />}
      </table>
    </React.Fragment>
  );
};

export default Table;
