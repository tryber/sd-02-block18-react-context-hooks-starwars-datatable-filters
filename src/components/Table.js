import React, { Component } from 'react';
import './Table.css';
import SWContext from '../context/starWarsContext';

class Table extends Component {
  static generateBody(data) {
    return (
      data
        .map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values).map((box, index) => (index !== 9
                ? <td className="tableData" key={box}>{box}</td>
                : null))}
            </tr>
          </tbody>
        )));
  }

  static generateTable(loading, data, error) {
    if (!loading && data) {
      return (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item) => (item !== 'residents'
                ? <th className="tableHeader" key={item}>{item}</th>
                : null))}
            </tr>
          </thead>
          {Table.generateBody(data)}
        </table>
      );
    }
    if (error) { return <div>{error}</div>; }
    return <div>Loading...</div>;
  }

  componentDidMount() {
    const { importedThunk } = this.props;
    importedThunk();
  }

  render() {
    return (
      <SWContext.Consumer>
        {(loading,
          data,
          error) => {
          return (
            <div>
              <h1>Star Wars - A New Saga begins!</h1>
              <input />
              <h2>Filters:</h2>
              {Table.generateTable(loading, data, error)}
            </div>
          );
        }}
      </SWContext.Consumer>
    );
  }
}

export default Table;

// const mapDispatchToProps = (dispatch) => ({
//   importedThunk: () => dispatch(thunkPlanets()),
// });