import React, { Component } from 'react';
import Table from './components/Table';
import SWContext from './context/starWarsContext';
import fetchPlanetFromServices from './services/swAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: '',
      error: null,
    };
    this.fetchSWPlanets = this.fetchSWPlanets.bind(this);
    this.handleSWFailure = this.handleSWFailure.bind(this);
    this.handleSWSuccess = this.handleSWSuccess.bind(this);
  }

  handleSWSuccess(response) {
    const { results } = response;
    this.setState({
      loading: false,
      data: results,
    });
  }

  handleSWFailure(response) {
    const { error } = response;
    this.setState({
      loading: false,
      error: error.message,
    });
  }

  fetchSWPlanets() {
    const { loading } = this.state;
    if (loading) return;
    this.setState({ loading: true });
    fetchPlanetFromServices()
      .then(this.handleSWSuccess, this.handleSWFailure);
  }

  render() {
    const contextValue = {
      ...this.state,
    };
    console.log(contextValue);
    return (
      <SWContext.Provider value={contextValue}>
        <div className="App">
          <h1>Star War Table: a Context/Redux Saga!</h1>
          <Table importedThunk={this.fetchSWPlanets} />
        </div>
      </SWContext.Provider>
    );
  }
}
export default App;
